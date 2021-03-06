import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import LinksPage from '../pages/LinksPage/';
import CreatePage from '../pages/CreatePage';
import DetailPage from '../pages/DetailPage/';
import AuthPage from '../pages/AuthPage';
import ConfirmPage from '../pages/ConfirmPage';


const useRoutes = (isAuthenticated: boolean) => {
	if(isAuthenticated)
		return (
			<Switch>
				<Route path="/links" exact component={LinksPage}/>
				<Route path="/create" exact component={CreatePage}/>
				<Route path="/detail/:id" exact component={DetailPage}/>

				<Route path="/" render={() => {console.log('Redirect'); return <Redirect to="/create"/>}}/>
			</Switch>
		);

	return (
		<Switch>
			<Route path="/" exact component={AuthPage}/>
			<Route path="/confirm/:code" exact component={ConfirmPage}/>

			<Redirect to="/"/>
		</Switch>
	);
};

export default useRoutes;

