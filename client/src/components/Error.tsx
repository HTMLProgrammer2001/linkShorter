import React from 'react';
import {Alert} from 'react-bootstrap';


const Error: React.FC<{text: string}> = ({text}) => (
	<Alert type="danger">{text}</Alert>
);

export default Error;
