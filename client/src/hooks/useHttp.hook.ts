import {useState, useCallback} from 'react';
import parse, {IParsedValidateErrors} from '../utils/validateErrorsParser';


type RequestParams = {
	url: string,
	method?: string,
	body?: any,
	headers?: Record<string, string>
}

const useHttp = () => {
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');
	const [errorsFields, setErrorFields] = useState<IParsedValidateErrors>({});

	const request = useCallback(
		async <T>({url, method = 'GET', body = null, headers = {}}: RequestParams): Promise<T> => {
			setLoading(true);

			if(body)
				body = JSON.stringify(body);

			headers['Content-Type'] = 'application/json';

			try {
				const response = await fetch(url, {method, body, headers});
				const data = await response.json();

				if(!response.ok) {
					if(data.errors)
						setErrorFields(parse(data.errors));
					else
						setErrorFields({});

					throw new Error(data.message || 'Something go wrong');
				}

				return data;
			}
			catch (e) {
				console.dir(e);

				setError(e.message);
				throw e;
			}
			finally {
				setLoading(false);
			}
		}, [setLoading, setError, setErrorFields]);

	const clearError = () => setError('');

	return {isLoading, request, error, clearError, errorsFields};
};

export default useHttp;
