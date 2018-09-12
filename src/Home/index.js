import React, { Component } from 'react';



class Home extends Component {
	constructor (props) {
		super(props);
		this.state = {

		}
	}

	handleClick = (e) => {
		e.preventDefault();
		this.props.carToView(e.target.id)
	}


	render() {
		return (
			<div className='home-container'>
				<div className='home-header'>
					<h2>Welcome to SafeT!</h2>
					<h4>Start by searching for a car to see all the crash test information provided by IIHS and NHTSA. Also check to see all the recalls that affect that model.</h4>
					<h4>If you have a few different cars you would like compare, no problem, add each car to the compare page and see their information side by side to help you make the best decision for you and your family!</h4>
				</div><br/>
				<div className='top-container'>
					<h3>Below are a list of Top Safety Pick+ vehicles shown by year to help you get started.</h3>
					<p>Click on each to see it's full safety page</p><br/>
					<p>Please note that this list is not all inclusive, and does not in it of itself contain all the information needed to make a well-informed decision. It is only be used as a starting off point</p>
					{this.props.topSafetyPicks.map((car, i) => {
						return (
							<div key={i} onClick={this.handleClick}>
								<h4 className='compare-link' id={car.nhtsa.vehicle_description}>{car.nhtsa.vehicle_description}</h4>
							</div>
						)
					})}
				</div>
			</div>
		)
	}



}


export default Home;