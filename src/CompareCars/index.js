import React, { Component } from 'react';
import {IIHS_top_safety, IIHS_FRMO, IIHS_FRSO, IIHS_FRSOP, IIHS_SR, IIHS_Rollover, IIHS_Rear, IIHS_FCPR, renderRecall, NHTSA} from '../SafetyViews'


const compareClassNames = ['compare-car-1', 'compare-car-2', 'compare-car-3'];


class CompareCars extends Component {
	constructor() {
		super();
		this.state = {

		}
	}

	//This function is empty to change the color of all subsequent functions (Sublime Text 3 bug)
    emptyFunction = () => {
    }

    buttonClick = (e) => {
    	e.preventDefault();
    	// console.log(e.target.value)
    	this.props.removeCar(e.target.value)
    }

    handleClick = (e) => {
    	e.preventDefault();

    	this.props.carToView(e.target.id)
    }

	render() {
		let warning = null;
		let cars = [];
		if(this.props.cars.length > 3) {
			warning = <h3 className='warning'>Limited to comparing 3 cars at one time. Please remove a car to see another car</h3>
			cars = [this.props.cars[0], this.props.cars[1], this.props.cars[2]]
		} else {
			cars = this.props.cars
		}


		if(this.props.cars.length === 0) {
			return <h3>Please search and add cars to compare to start comparing</h3>
		} else {
			return (
				<div className='compareContainer'>
				{warning}
					{cars.map((car, i) => {
						return (
							<div key={i} className={compareClassNames[i]}>
								<div onClick={this.handleClick}>
									<h3 id={car.iihs[0].fields.vehicle_description}>{car.iihs[0].fields.vehicle_description}</h3>
								</div>
								<button onClick={this.buttonClick} value={car.nhtsa[0].fields.vehicle_description}>Remove from Comparison</button>
								<div className='ratings-container'>
									{NHTSA(car.nhtsa[0].fields)}
									<div className='spacer'>
									</div>
									<div className='IIHS-ratings'>
										<h4 className='heading'>IIHS Crash Test Ratings</h4>
										{IIHS_top_safety(car.iihs[0].fields)}
										{IIHS_FRMO(car.iihs[0].fields)}
										{IIHS_FRSO(car.iihs[0].fields)}
										{IIHS_FRSOP(car.iihs[0].fields)}
										{IIHS_SR(car.iihs[0].fields)}
										{IIHS_Rollover(car.iihs[0].fields)}
										{IIHS_Rear(car.iihs[0].fields)}
										{IIHS_FCPR(car.iihs[0].fields)}
									</div>
								</div>
								<div className='recalls'>
									{car.recall.map((recall, i) => {
										return renderRecall(recall, i)
									})}
								</div>
							</div>
						)
					})}
				</div>
			)
		}
	}
}



export default CompareCars