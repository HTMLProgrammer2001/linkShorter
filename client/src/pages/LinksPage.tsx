import React, {useContext, useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';

import {ILink} from '../interfaces/ILink';
import {IGetUserLinksResponse} from '../interfaces/Responses/IGetUserLinksResponse';

import useHttp from '../hooks/useHttp.hook';
import AuthContext from '../context/auth.context';


const LinksPage: React.FC<{}> = () => {
	const [links, setLinks] = useState<ILink[]>([]);
	const [isLoading, setLoading] = useState(false);
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
		return <div>Loading...</div>;

	if(error)
		return <div className="text-warning">{error}</div>;

	if(!links.length)
		return <div>You haven't links yet</div>;

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
					</tr>
				</thead>

				<tbody>
					{links.map((link, index) => (
						<tr key={link._id}>
							<td>{index + 1}</td>

							<td>
								<a href={link.from} target="_blank">
									{link.from}
								</a>
							</td>

							<td>
								<a href={link.to} target="_blank">
									{link.to}
								</a>
							</td>

							<td>{link.visitions.length}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default LinksPage;
