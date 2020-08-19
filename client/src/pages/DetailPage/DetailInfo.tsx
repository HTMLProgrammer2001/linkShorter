import React from 'react';
import {ILink} from '../../interfaces/ILink';


const DetailInfo: React.FC<{link: ILink}> = ({link}) => (
	<div>
		<div>ID: {link._id}</div>
		<div>Code: {link.code}</div>
		<div>Date of registration: {new Date(link.date).toLocaleString()}</div>
		<div>Clicks count: {link.visitions.length}</div>

		<div>
			<span>From: </span>
			<a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
		</div>

		<div>
			<span>To: </span>
			<a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
		</div>
	</div>
);

export default DetailInfo;
