import React from 'react';
import {Col, Form, Row, FormControl, FormGroup, Button, FormLabel, Card} from 'react-bootstrap';
import {toast} from 'react-toastify';

import useHttp from '../hooks/useHttp.hook';
import AuthContext from '../context/auth.context';
import {ILoginResponse} from '../interfaces/Responses/ILoginResponse';


const AuthPage: React.FC<{}> = () => {
	const [form, changeForm] = React.useState({email: '', password: ''});
	const {login} = React.useContext(AuthContext);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name as 'email' | 'password';

		changeForm({...form, [field]: e.target.value});
	};

	const {request, isLoading, errorsFields} = useHttp();

	const signInHandler = async () => {
		try {
			const data = await request<{message: string}>({
				url: '/api/auth/register',
				method: 'POST',
				body: form
			});

			toast.success(data.message);
		}
		catch(e){
			toast.error(e.message);
		}
	};

	const loginHandler = async () => {
		try{
			const data = await request<ILoginResponse>({
				url: '/api/auth/login',
				method: 'POST',
				body: form
			});

			login(data.token, data.userID);
		}
		catch(e){
			toast.error(e.message);
		}
	};

	return (
		<Row className="my-3">
			<Col md={{span: 6, offset: 3}}>
				<Form>
					<Card>
						<Card.Header>
							<b>Authorization</b>
						</Card.Header>

						<Card.Body>
							<FormGroup>
								<FormLabel htmlFor="email" column={true}>Email</FormLabel>

								<FormControl
									type="text"
									id="email"
									name="email"
									placeholder="Email"
									value={form.email}
									onChange={onChangeHandler}
								/>

								<FormControl.Feedback type="invalid" className="d-block">
									{errorsFields['email']}
								</FormControl.Feedback>
							</FormGroup>

							<FormGroup>
								<FormLabel htmlFor="password" column={true}>Password</FormLabel>

								<FormControl
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									value={form.password}
									onChange={onChangeHandler}
								/>

								<FormControl.Feedback type="invalid" className="d-block">
									{errorsFields['password']}
								</FormControl.Feedback>
							</FormGroup>
						</Card.Body>

						<Card.Footer>
							<Row className="justify-content-end">
								<Button
									type="button"
									variant="primary"
									className="m-2"
									disabled={isLoading}
									onClick={loginHandler}
								>Log in</Button>

								<Button
									type="button"
									variant="secondary"
									className="m-2"
									disabled={isLoading}
									onClick={signInHandler}
								>
									Sign in
								</Button>
							</Row>
						</Card.Footer>
					</Card>
				</Form>
			</Col>
		</Row>
	);
};

export default AuthPage;
