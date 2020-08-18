import React from 'react';
import {Row, Col, Form, FormLabel, FormControl} from 'react-bootstrap';


const CreatePage: React.FC<{}> = () => {
	return (
		<Row>
			<Col xs={{span: 8, offset: 2}}>
				<Form>
					<FormLabel htmlFor="url">Enter url to short</FormLabel>
					<FormControl/>
				</Form>
			</Col>
		</Row>
	);
};

export default CreatePage;
