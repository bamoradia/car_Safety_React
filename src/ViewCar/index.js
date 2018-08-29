import React, { Component } from 'react';
import {IIHS_top_safety, IIHS_FRMO, IIHS_FRSO, IIHS_FRSOP, IIHS_SR, IIHS_Rollover, IIHS_Rear, IIHS_FCPR, renderRecall, NHTSA} from '../SafetyViews'


class ViewCar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			iihs: this.props.searchedCar.iihs[0].fields,
			recalls: this.props.searchedCar.recall,
			nhtsa: this.props.searchedCar.nhtsa[0].fields
		}
	}

	//This function is empty to change the color of all subsequent functions (Sublime Text 3 bug)
    emptyFunction = () => {
    }

    handleClick= (e) => {
    	this.props.compareCar();
    }

	render() {
		return (
			<div className='viewContainer'>
				<h3>{this.state.iihs.vehicle_description}</h3>
				<button onClick={this.handleClick}>Add to Comparison</button>
				<div className='ratings-container'>
					{NHTSA(this.state.nhtsa)}
					<div className='spacer'>
					</div>
					<div className='IIHS-ratings'>
						<h4 className='heading'>IIHS Crash Test Ratings</h4>
						{IIHS_top_safety(this.state.iihs)}
						{IIHS_FRMO(this.state.iihs)}
						{IIHS_FRSO(this.state.iihs)}
						{IIHS_FRSOP(this.state.iihs)}
						{IIHS_SR(this.state.iihs)}
						{IIHS_Rollover(this.state.iihs)}
						{IIHS_Rear(this.state.iihs)}
						{IIHS_FCPR(this.state.iihs)}
					</div>
				</div>
				<div className='recalls'>
					{this.state.recalls.map((recall, i) => {
						return renderRecall(recall, i)
					})}
				</div>
			</div>
		)
	}
}

export default ViewCar;


















