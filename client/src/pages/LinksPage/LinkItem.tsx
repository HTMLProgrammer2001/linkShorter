import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

import {ILink} from '../../interfaces/ILink';
import {IDeleteLinkResponse} from '../../interfaces/Responses/IDeleteLinkResponse';
import useHttp from '../../hooks/useHttp.hook';
import AuthContext from '../../context/auth.context';


type ILinkItemProps = ILink & {
	no: number,
	onDelete?: () => void
};

const LinkItem: React.FC<ILinkItemProps> = (props) => {
	const [isDeleting, setDeleting] = useState<boolean>(false);

	const {request} = useHttp();
	const {token} = useContext(AuthContext);

	const deleteLink = async (id: string) => {
		if(isDeleting)
			return;

		setDeleting(true);

		try {
			const data = await request<IDeleteLinkResponse>({
				url: `/api/link/${id}`,
				method: 'DELETE',
				headers: {Authorization: `Bearer ${token}`}
			});

			toast.success(data.message);

			if(props.onDelete)
				props.onDelete();
		}
		catch (e) {
			toast.error(e.message);
		}
		finally {
			setDeleting(false);
		}
	};

	return (
		<tr key={props._id}>
			<td>{props.no + 1}</td>

			<td>
				<a href={props.from} target="_blank" rel="noreferrer noopener">
					{props.from}
				</a>
			</td>

			<td>
				<a href={props.to} target="_blank" rel="noreferrer noopener">
					{props.to}
				</a>
			</td>

			<td>{props.visitions.length}</td>

			<td>
				<span onClick={() => deleteLink(props._id)}>&times;</span>

				<Link to={`/detail/${props._id}`}>
					View
				</Link>
			</td>
		</tr>
	);
};

export default LinkItem;
