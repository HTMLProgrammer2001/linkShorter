import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Container from 'react-bootstrap/cjs/Container';

import './App.scss';
import useRoutes from './hooks/useRoutes.hook';
import useAuth from './hooks/useAuth.hook';
import AuthContext from './context/auth.context';
import Navbar from './components/Navbar';


const App: React.FC<{}> = () => {
	const {login, logout, token, userID} = useAuth();
	const isAuthenticated = !!token;
	const routes: React.ReactElement = useRoutes(isAuthenticated);

	return (
		<AuthContext.Provider value={{login, logout, token, userID, isAuthenticated}}>
			<Router>
				{isAuthenticated && <Navbar/>}

				<Container>
					{routes}
				</Container>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
