import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {ILink} from '../interfaces/ILink';
import useHttp from '../hooks/useHttp.hook';
import AuthContext from '../context/auth.context';
import {IGetLinkResponse} from '../interfaces/Responses/IGetLinkResponse';


const DetailPage: React.FC<{}> = () => {
	const [link, setLink] = useState<ILink>(null);
	const [error, setError] = useState<string>(null);
	const [isLoading, setLoading] = useState(true);

	const {request} = useHttp();
	const {token} = useContext(AuthContext);

	//get url params
	const params = useParams<{id: string}>();

	useEffect(() => {
		//set loading flag
		setLoading(true);

		//send request
		request<IGetLinkResponse>({
			url: `/api/link/${params.id}`,
			method: 'GET',
			headers: {Authorization: `Bearer ${token}`}
		}).then((data: IGetLinkResponse) => {
			setLink(data.link);
		}).catch(e => {
			setError(e.message);
		}).finally(() => setLoading(false));
	}, []);

	if(isLoading)
		return <div>Loading...</div>;

	if(error)
		return <div className="text-warning">{error}</div>;

	return (
		<>
			<h1>Detail</h1>

			<div>
				<div>ID: {link._id}</div>
				<div>Code: {link.code}</div>
				<div>Date of registration: {new Date(link.date).toLocaleString()}</div>
				<div>Clicks count: {link.visitions.length}</div>

				<div>
					<span>From: </span>
					<a href={link.from} target="_blank">{link.from}</a>
				</div>

				<div>
					<span>To: </span>
					<a href={link.to} target="_blank">{link.to}</a>
				</div>
			</div>
		</>
	);
};

export default DetailPage;
