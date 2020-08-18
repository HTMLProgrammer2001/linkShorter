import {useState, useCallback} from 'react';


type RequestParams = {
	url: string,
	method?: string,
	body?: any,
	headers?: Record<string, string>
}

const useHttp = () => {
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');

	const request = useCallback(
		async <T>({url, method = 'GET', body = null, headers = {}}: RequestParams) => {
			setLoading(true);

			if(body)
				body = JSON.stringify(body);

			headers['Content-Type'] = 'application/json';

			try {
				const response = await fetch(url, {method, body, headers});
				const data = await response.json();

				if(!response.ok)
					throw new Error(data.message || 'Something go wrong');

				return data;
			}
			catch (e) {
				setError(e.message);
				throw e;
			}
			finally {
				setLoading(false);
			}
		}, [setLoading, setError]);

	const clearError = () => setError('');

	return {isLoading, request, error, clearError};
};

export default useHttp;
