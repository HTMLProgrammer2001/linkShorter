import {createContext} from 'react';


type IAuthContextData = {
	token: string,
	userID: number,
	login: Function,
	logout: Function,
	isAuthenticated: boolean
};

const AuthContext = createContext<IAuthContextData>({
	token: null,
	userID: null,
	login: () => {},
	logout: () => {},
	isAuthenticated: false
});

export default AuthContext;
