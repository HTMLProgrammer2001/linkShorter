import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Card, Row} from 'react-bootstrap';

import {ILink} from '../../interfaces/ILink';
import {IDeleteLinkResponse} from '../../interfaces/Responses/IDeleteLinkResponse';
import {IGetLinkResponse} from '../../interfaces/Responses/IGetLinkResponse';

import useHttp from '../../hooks/useHttp.hook';
import AuthContext from '../../context/auth.context';
import {Button} from 'react-bootstrap';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import DetailInfo from './DetailInfo';


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
		return <Loader/>;

	if(error)
		return <Error text={error}/>;

	return (
		<Row className="justify-content-center my-3">
			<Card className="w-100">
				<Card.Header>
					<b>Details</b>
				</Card.Header>

				<Card.Body>
					<DetailInfo link={link}/>
				</Card.Body>

				<Card.Footer>
					<Row className="justify-content-end">
						<Button
							className="my-2"
							variant="danger"
							disabled={isDeleteLoading}
							onClick={() => deleteLink(link._id)}
						>Delete link</Button>
					</Row>
				</Card.Footer>
			</Card>
		</Row>
	);
};

export default DetailPage;
