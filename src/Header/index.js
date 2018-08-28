import React from 'react';
import { Link } from 'react-router-dom';


const Header = (props) => {
	return(
		<header>
			<Link style={{ textDecoration: 'none'}} to='/'><span>Home</span></Link>
			<Link style={{ textDecoration: 'none'}} to='/search'><span>Search</span></Link>
			<a href='#'>Compare Cars</a>
		</header>

	)
}


export default Header;