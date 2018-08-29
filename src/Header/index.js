import React from 'react';
import { Link } from 'react-router-dom';


const Header = (props) => {
	return(
		<header>
			<Link style={{ textDecoration: 'none'}} to='/'><span>Home</span></Link>
			<Link style={{ textDecoration: 'none'}} to='/search'><span>Search</span></Link>
			<Link style={{ textDecoration: 'none'}} to='/view'><span>View Car</span></Link>
			<Link style={{ textDecoration: 'none'}} to='/compare'><span>Compare Cars</span></Link>
		</header>

	)
}


export default Header;