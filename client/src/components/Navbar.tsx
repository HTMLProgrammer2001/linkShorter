import React, {useContext} from 'react';

import AuthContext from '../context/auth.context';
import {NavLink} from 'react-router-dom';
import {Nav, NavItem, Row, NavbarBrand} from 'react-bootstrap';


const Navbar: React.FC<{}> = () => {
	const {logout} = useContext(AuthContext);

	return (
		<Row className="justify-content-between bg-primary p-2 text-white" noGutters>
			<NavbarBrand>Short your link</NavbarBrand>

			<Nav>
				<NavItem>
					<NavLink to="/create" className="text-white p-1">Create</NavLink>
				</NavItem>

				<NavItem>
					<NavLink to="/links" className="text-white p-1">Links</NavLink>
				</NavItem>

				<NavItem>
					<a href="#" onClick={() => logout()} className="text-white">Logout</a>
				</NavItem>
			</Nav>
		</Row>
	);
};

export default Navbar;
