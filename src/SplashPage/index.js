import React, { Component } from 'react';



class SplashPage extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	//This function is empty to change the color of all subsequent functions (Sublime Text 3 bug)
	emptyFunction = () => {
	}

	clickHandle = (e) => {
		e.preventDefault();
		this.props.changeSplash()
	}

	render() {
		return(
			<div className='splash'>
				<p>This website can be used to see safety ratings for a specific vehicle and to compare against other vechicles.</p>
				<p>By clicking the button to continue onto the website, you agree that we are not liable for the information shown within. All information is gathered from nhtsa.gov and iihs.org</p>
				<button onClick={this.clickHandle} >Continue to Home Page</button>
			</div>


		)
	}
}

export default SplashPage;