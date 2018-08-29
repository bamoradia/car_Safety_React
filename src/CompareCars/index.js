import React, { Component } from 'react';
import {IIHS_top_safety, IIHS_FRMO, IIHS_FRSO, IIHS_FRSOP, IIHS_SR, IIHS_Rollover, IIHS_Rear, IIHS_FCPR, renderRecall, NHTSA} from '../SafetyViews'


const compareClassNames = ['compare-car-1', 'compare-car-2', 'compare-car-3'];


class CompareCars extends Component {
	constructor() {
		super();
		this.state = {

		}
	}

	render() {
		if(this.props.cars.length === 0) {
			return <h3>Please search and add cars to compare to start comparing</h3>
		} else {
			return (
				<div className='compareContainer'>
					{this.props.cars.map((car, i) => {
						console.log('---------------------------------')
						console.log(car, 'this is car inside the map')
						console.log('---------------------------------')
						return (
							<div key={i} className={compareClassNames[i]}>
								<h3>{car.iihs.vehicle_description}</h3>
								<button onClick={this.handleClick}>Add to Comparison</button>
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