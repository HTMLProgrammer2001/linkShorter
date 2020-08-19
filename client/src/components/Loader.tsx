import React from 'react';
import {Row, Spinner} from 'react-bootstrap';


const Loader: React.FC<{}> = () => (
	<Row className="justify-content-center my-2">
		<Spinner animation="border"/>
	</Row>
);

export default Loader;
