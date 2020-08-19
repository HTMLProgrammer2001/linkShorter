import React, {useContext, useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';

import {ILink} from '../../interfaces/ILink';
import {IGetUserLinksResponse} from '../../interfaces/Responses/IGetUserLinksResponse';

import useHttp from '../../hooks/useHttp.hook';
import AuthContext from '../../context/auth.context';
import LinkItem from './LinkItem';
import Loader from '../../components/Loader';
import Error from '../../components/Error';


const LinksPage: React.FC<{}> = () => {
	const [links, setLinks] = useState<ILink[]>([]);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>(null);

	const {request} = useHttp();
	const {token} = useContext(AuthContext);

	useEffect(() => {
		//set loading flag
		setLoading(true);

		//send request
		request<IGetUserLinksResponse>({
			url: '/api/link',
			method: 'GET',
			headers: {Authorization: `Bearer ${token}`}
		})
			.then((data) => {
				setLinks(data.links);
			})
			.catch(e => {
				setError(e.message);
			})
			.finally(() => setLoading(false));
	}, []);

	if(isLoading)
		return <Loader/>;

	if(error)
		return <Error text={error}/>;

	if(!links.length)
		return <div className="text-center">You haven't links yet</div>;

	return (
		<>
			<h3>Links page</h3>

			<Table hover bordered>
				<thead>
					<tr>
						<th>#</th>
						<th>From</th>
						<th>To</th>
						<th>Clicks</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{
						links.map((link, index) => (
							<LinkItem {...link} no={index}/>)
						)
					}
				</tbody>
			</Table>
		</>
	);
};

export default LinksPage;
