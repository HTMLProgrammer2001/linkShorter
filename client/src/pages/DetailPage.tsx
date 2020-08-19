import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Card} from 'react-bootstrap';

import {ILink} from '../interfaces/ILink';
import useHttp from '../hooks/useHttp.hook';
import AuthContext from '../context/auth.context';
import {IGetLinkResponse} from '../interfaces/Responses/IGetLinkResponse';
import {Button} from 'react-bootstrap';
import {IDeleteLinkResponse} from '../interfaces/Responses/IDeleteLinkResponse';


const DetailPage: React.FC<{}> = () => {
	const [link, setLink] = useState<ILink>(null);
	const [error, setError] = useState<string>(null);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [isDeleteLoading, setDeletaLoading] = useState<boolean>(false);

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

	const deleteLink = async (id: string) => {
		setDeletaLoading(true);

		try {
			const data = await request<IDeleteLinkResponse>({
				url: `/api/link/${id}`,
				method: 'DELETE',
				headers: {Authorization: `Bearer ${token}`}
			});

			toast.success(data.message);
		}
		catch (e) {
			toast.error(e.message);
		}
		finally {
			setDeletaLoading(false);
		}
	};

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

				<div className="justify-content-end">
					<Button
						className="my-2"
						variant="danger"
						disabled={isDeleteLoading}
						onClick={() => deleteLink(link._id)}
					>Delete link</Button>
				</div>
			</div>
		</>
	);
};

export default DetailPage;
