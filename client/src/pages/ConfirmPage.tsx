import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import {toast} from 'react-toastify';

import useHttp from '../hooks/useHttp.hook';
import Loader from '../components/Loader';


const ConfirmPage: React.FC<{}> = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const {request} = useHttp();
	const params = useParams<{code: string}>();

	useEffect(() => {
		request<{message: string}>({
			url: `/api/auth/confirm/${params.code}`,
			method: 'GET'
		}).then(data => {
			toast.success(data.message);
		}).catch((e) => {
			toast.error(e.message);
		}).finally(() => {
			setLoading(false);
		});
	}, []);

	if(isLoading)
		return <Loader/>;

	return <Redirect to="/"/>
};

export default ConfirmPage;
