import React, {useContext, useState} from 'react';
import {Row, Col, Form, FormLabel, FormControl, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';

import useHttp from '../hooks/useHttp.hook';
import {IGenerateResponse} from '../interfaces/Responses/IGenerateResponse';
import AuthContext from '../context/auth.context';


const CreatePage: React.FC<{}> = () => {
	const [url, setUrl] = useState<string>('');
	const [isLoading, setLoading] = useState(false);

	const history = useHistory();

	const {request} = useHttp();
	const {token} = useContext(AuthContext);

	const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	const sendHandler = async () => {
		try {
			const data: IGenerateResponse = await request<IGenerateResponse>({
				url: '/api/link/generate',
				method: 'POST',
				body: {from: url},
				headers: {Authorization: `Bearer ${token}`}
			});

			history.push(`/detail/${data.link._id}`);

			setLoading(false);
		} catch (e) {
			toast.error(e.message);
		}
	};

	return (
		<Row>
			<Col xs={{span: 8, offset: 2}}>
				<Form>
					<FormLabel htmlFor="urlField" column={true}>Enter url to short</FormLabel>
					<FormControl
						type="text"
						name="url"
						id="urlField"
						value={url}
						onChange={formChangeHandler}
					/>
				</Form>

				<div className="d-flex justify-content-end">
					<Button
						type="button"
						variant="primary"
						className="m-2"
						onClick={sendHandler}
						disabled={isLoading}
					>Short it!</Button>
				</div>
			</Col>
		</Row>
	);
};

export default CreatePage;
