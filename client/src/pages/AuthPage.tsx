import React from 'react';
import {Col, Form, Row, FormControl, FormGroup, Button, FormLabel} from 'react-bootstrap';

import useHttp from '../hooks/useHttp.hook';
import AuthContext from '../context/auth.context';
import {ILoginResponse} from '../interfaces/ILoginResponse';


const AuthPage: React.FC<{}> = () => {
	const [form, changeForm] = React.useState({email: '', password: ''});
	const {isAuthenticated, login} = React.useContext(AuthContext);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name as 'email' | 'password';

		changeForm({...form, [field]: e.target.value});
	};

	const {request, error, isLoading} = useHttp();

	const signInHandler = async () => {
		try {
			const data = await request<{message: string}>({
				url: '/api/auth/register',
				method: 'POST',
				body: form
			});

			alert(data.message);
		}
		catch(e){
			alert(e.message);
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
			alert(e.message);
		}
	};

	return (
		<Row>
			<Col md={{span: 6, offset: 3}}>
				<Form>
					<h3 className="text-center">Authorization</h3>

					<FormGroup controlId="emailInfo">
						<FormLabel htmlFor="email" column={true}>Email</FormLabel>

						<FormControl
							type="text"
							id="email"
							name="email"
							placeholder="Email"
							value={form.email}
							onChange={onChangeHandler}
						/>
					</FormGroup>

					<FormGroup controlId="passwordInfo">
						<FormLabel htmlFor="password" column={true}>Password</FormLabel>

						<FormControl
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							value={form.password}
							onChange={onChangeHandler}
						/>
					</FormGroup>

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
				</Form>
			</Col>
		</Row>
	);
};

export default AuthPage;
