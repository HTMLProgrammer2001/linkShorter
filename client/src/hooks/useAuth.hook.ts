import {useState, useCallback, useEffect} from 'react';


type UserStorage = {
	token: string,
	userID: number
};

const useAuth = () => {
	const [token, setToken] = useState<string>(null);
	const [userID, setUserID] = useState<number>(null);

	const login = useCallback((jwtToken: string, userID: number) => {
		setToken(jwtToken);
		setUserID(userID);

		localStorage.setItem('userData', JSON.stringify({
			token: jwtToken,
			userID
		}));
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserID(null);

		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		const data: UserStorage = JSON.parse(localStorage.getItem('userData'));

		if(data && data.token)
			login(data.token, data.userID);
	}, [login]);

	return {login, logout, userID, token};
};

export default useAuth;
