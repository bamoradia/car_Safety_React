import React, { Component } from 'react';


class ViewCar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			iihs: this.props.searchedCar.iihs[0].fields,
			recalls: this.props.searchedCar.recall,
			nhtsa: this.props.searchedCar.nhtsa[0].fields
		}
	}

	render() {
		console.log(this.state.nhtsa)
		return (
			<div>
				<h3>{this.state.iihs.vehicle_description}</h3>
				<div className='ratings-container'>
					{NHTSA(this.state.nhtsa)}
					<div className='IIHS-ratings'>
						<h4>IIHS Crash Test Ratings:</h4>
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







// Renders the proper information associated with top safety pick
// -------------------------Add Top Safety or Top Safety+ Image? -------------------//
function IIHS_top_safety(iihs_input) {
	//Set all variables to null beforehand	
	let built_after_jsx = null;
	let top_safety_jsx = <h3>Not an IIHS Top Safety Pick</h3>
	let notes_jsx = null; 

	//check if built before conditionall statement exists
	if(iihs_input.tsp_built_after !== null) {
		const built_after = iihs_input.tsp_built_after;
		const firstSemiColonIndex = built_after.indexOf(':');
		const firstCommaIndex = built_after.indexOf(',');
		const month = built_after.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_after.indexOf(':', firstSemiColonIndex + 1)
		const year = built_after.slice(secondSemiColonIndex + 2,  -1)

		built_after_jsx = <h4>Built After: {month}/{year}</h4>
	}

	//checks if vehicle is top safety pick+ or top safety pick
	if(iihs_input.top_safety_pick === 'True') {
		top_safety_jsx = <h3>{iihs_input.tsp_year} Top Safety Pick+</h3>
	} else if (iihs_input.tsp_year !== null) {
		top_safety_jsx = <h3>{iihs_input.tsp_year} Top Safety Pick</h3>
	}

	//check if there is qualifying conditional associated with the top safety pick
	if(iihs_input.tsp_qualifying_text !== null) {
		notes_jsx = <h4>Notes: {iihs_input.tsp_qualifying_text}</h4>
	}

	return (
		<div className='card-layout'>
			{top_safety_jsx}
			{built_after_jsx}
			{notes_jsx}
		</div>
	)	
}



//Renders the proper information assciated with the IIHS front moderate overlap test
function IIHS_FRMO(iihs_input) {
	let overall_rating = <h3>Front Moderate Overlap was not tested for this vehicle</h3>
	let built_before = null
	let built_after = null
	let qualifying_text = null

	if(iihs_input.frmo_built_before !== null) {
		const built_before_local = iihs_input.frmo_built_before;
		const firstSemiColonIndex = built_before_local.indexOf(':');
		const firstCommaIndex = built_before_local.indexOf(',');
		const month = built_before_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_before_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_before_local.slice(secondSemiColonIndex + 2,  -1)

		built_before = <h4>Built Before: {month}/{year}</h4>
	}
	if(iihs_input.frmo_built_after !== null) {
		const built_after_local = iihs_input.frmo_built_after;
		const firstSemiColonIndex = built_after_local.indexOf(':');
		const firstCommaIndex = built_after_local.indexOf(',');
		const month = built_after_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_after_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_after_local.slice(secondSemiColonIndex + 2,  -1)

		built_after = <h4>Built After: {month}/{year}</h4>
	}

	if(iihs_input.frmo_qualifying_text !== null) {
		qualifying_text = <h4>Notes: {iihs_input.frmo_qualifying_text}</h4>
	}

	if(iihs_input.frmo_overall_rating !== null) {
		overall_rating = <h3>Front Moderate Overlap Overall Rating: {iihs_input.frmo_overall_rating}</h3>
	}

	return (
		<div className='card-layout'>
			{overall_rating}
			{built_before}
			{built_after}
			{qualifying_text}
		</div>
	)
}


//Renders the proper information assciated with the IIHS front small overlap test
function IIHS_FRSO(iihs_input) {
	let overall_rating = <h3>Front Small Overlap was not tested for this vehicle</h3>
	let built_before = null
	let built_after = null
	let qualifying_text = null

	if(iihs_input.frso_built_before !== null) {
		const built_before_local = iihs_input.frso_built_before;
		const firstSemiColonIndex = built_before_local.indexOf(':');
		const firstCommaIndex = built_before_local.indexOf(',');
		const month = built_before_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_before_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_before_local.slice(secondSemiColonIndex + 2,  -1)

		built_before = <h4>Built Before: {month}/{year}</h4>
	}
	if(iihs_input.frso_built_after !== null) {
		const built_after_local = iihs_input.frso_built_after;
		const firstSemiColonIndex = built_after_local.indexOf(':');
		const firstCommaIndex = built_after_local.indexOf(',');
		const month = built_after_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_after_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_after_local.slice(secondSemiColonIndex + 2,  -1)

		built_after = <h4>Built After: {month}/{year}</h4>
	}

	if(iihs_input.frso_qualifying_text !== null) {
		qualifying_text = <h4>Notes: {iihs_input.frso_qualifying_text}</h4>
	}

	if(iihs_input.frso_overall_rating !== null) {
		overall_rating = <h3>Front Small Overlap Overall Rating: {iihs_input.frso_overall_rating}</h3>
	}

	return (
		<div className='card-layout'>
			{overall_rating}
			{built_before}
			{built_after}
			{qualifying_text}
		</div>
	)
}


//Renders the proper information assciated with the IIHS front small overlap passenger side test
function IIHS_FRSOP(iihs_input) {
	let overall_rating = <h3>Front Small Overlap Passenger Side was not tested for this vehicle</h3>
	let built_before = null
	let built_after = null
	let qualifying_text = null

	if(iihs_input.frsop_built_before !== null) {
		const built_before_local = iihs_input.frsop_built_before;
		const firstSemiColonIndex = built_before_local.indexOf(':');
		const firstCommaIndex = built_before_local.indexOf(',');
		const month = built_before_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_before_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_before_local.slice(secondSemiColonIndex + 2,  -1)

		built_before = <h4>Built Before: {month}/{year}</h4>
	}
	if(iihs_input.frsop_built_after !== null) {
		const built_after_local = iihs_input.frsop_built_after;
		const firstSemiColonIndex = built_after_local.indexOf(':');
		const firstCommaIndex = built_after_local.indexOf(',');
		const month = built_after_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_after_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_after_local.slice(secondSemiColonIndex + 2,  -1)

		built_after = <h4>Built After: {month}/{year}</h4>
	}

	if(iihs_input.frsop_qualifying_text !== null) {
		qualifying_text = <h4>Notes: {iihs_input.frsop_qualifying_text}</h4>
	}

	if(iihs_input.frsop_overall_rating !== null) {
		overall_rating = <h3>Front Small Overlap Passenger Side Overall Rating: {iihs_input.frsop_overall_rating}</h3>
	}

	return (
		<div className='card-layout'>
			{overall_rating}
			{built_before}
			{built_after}
			{qualifying_text}
		</div>
	)
}


//Renders the proper information assciated with the IIHS Side Test test
function IIHS_SR(iihs_input) {
	let overall_rating = <h3>Side was not tested for this vehicle</h3>
	let built_before = null
	let built_after = null
	let qualifying_text = null

	if(iihs_input.sr_built_before !== null) {
		const built_before_local = iihs_input.sr_built_before;
		const firstSemiColonIndex = built_before_local.indexOf(':');
		const firstCommaIndex = built_before_local.indexOf(',');
		const month = built_before_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_before_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_before_local.slice(secondSemiColonIndex + 2,  -1)

		built_before = <h4>Built Before: {month}/{year}</h4>
	}
	if(iihs_input.sr_built_after !== null) {
		const built_after_local = iihs_input.sr_built_after;
		const firstSemiColonIndex = built_after_local.indexOf(':');
		const firstCommaIndex = built_after_local.indexOf(',');
		const month = built_after_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_after_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_after_local.slice(secondSemiColonIndex + 2,  -1)

		built_after = <h4>Built After: {month}/{year}</h4>
	}

	if(iihs_input.sr_qualifying_text !== null) {
		qualifying_text = <h4>Notes: {iihs_input.sr_qualifying_text}</h4>
	}

	if(iihs_input.sr_overall_rating !== null) {
		overall_rating = <h3>Side Overall Rating: {iihs_input.sr_overall_rating}</h3>
	}

	return (
		<div className='card-layout'>
			{overall_rating}
			{built_before}
			{built_after}
			{qualifying_text}
		</div>
	)
}




//Renders the proper information assciated with the IIHS Side Test test
function IIHS_Rollover(iihs_input) {
	let overall_rating = <h3>Rollover was not tested for this vehicle</h3>
	let built_before = null
	let built_after = null
	let qualifying_text = null

	if(iihs_input.rollover_built_before !== null) {
		const built_before_local = iihs_input.rollover_built_before;
		const firstSemiColonIndex = built_before_local.indexOf(':');
		const firstCommaIndex = built_before_local.indexOf(',');
		const month = built_before_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_before_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_before_local.slice(secondSemiColonIndex + 2,  -1)

		built_before = <h4>Built Before: {month}/{year}</h4>
	}
	if(iihs_input.rollover_built_after !== null) {
		const built_after_local = iihs_input.rollover_built_after;
		const firstSemiColonIndex = built_after_local.indexOf(':');
		const firstCommaIndex = built_after_local.indexOf(',');
		const month = built_after_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_after_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_after_local.slice(secondSemiColonIndex + 2,  -1)

		built_after = <h4>Built After: {month}/{year}</h4>
	}

	if(iihs_input.rollover_qualifying_text !== null) {
		qualifying_text = <h4>Notes: {iihs_input.rollover_qualifying_text}</h4>
	}

	if(iihs_input.rollover_overall_rating !== null) {
		overall_rating = <h3>Rollover Overall Rating: {iihs_input.rollover_overall_rating}</h3>
	}

	return (
		<div className='card-layout'>
			{overall_rating}
			{built_before}
			{built_after}
			{qualifying_text}
		</div>
	)
}


//Renders the proper information assciated with the IIHS Side Test test
function IIHS_Rear(iihs_input) {
	let overall_rating = <h3>Rear was not tested for this vehicle</h3>
	let built_before = null
	let built_after = null
	let qualifying_text = null

	if(iihs_input.rear_built_before !== null) {
		const built_before_local = iihs_input.rear_built_before;
		const firstSemiColonIndex = built_before_local.indexOf(':');
		const firstCommaIndex = built_before_local.indexOf(',');
		const month = built_before_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_before_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_before_local.slice(secondSemiColonIndex + 2,  -1)

		built_before = <h4>Built Before: {month}/{year}</h4>
	}
	if(iihs_input.rear_built_after !== null) {
		const built_after_local = iihs_input.rear_built_after;
		const firstSemiColonIndex = built_after_local.indexOf(':');
		const firstCommaIndex = built_after_local.indexOf(',');
		const month = built_after_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_after_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_after_local.slice(secondSemiColonIndex + 2,  -1)

		built_after = <h4>Built After: {month}/{year}</h4>
	}

	if(iihs_input.rear_qualifying_text !== null) {
		qualifying_text = <h4>Notes: {iihs_input.rear_qualifying_text}</h4>
	}

	if(iihs_input.rear_overall_rating !== null) {
		overall_rating = <h3>Rear Overall Rating: {iihs_input.rear_overall_rating}</h3>
	}

	return (
		<div className='card-layout'>
			{overall_rating}
			{built_before}
			{built_after}
			{qualifying_text}
		</div>
	)
}


//Renders the proper information assciated with the IIHS Side Test test
function IIHS_FCPR(iihs_input) {
	let overall_rating_points = null
	let overall_rating_text = <h3>Front Crash Prevention was not tested for this vehicle</h3>
	let built_before = null
	let built_after = null
	let qualifying_text = null


	if(iihs_input.fcpr_built_before !== null) {
		const built_before_local = iihs_input.fcpr_built_before;
		const firstSemiColonIndex = built_before_local.indexOf(':');
		const firstCommaIndex = built_before_local.indexOf(',');
		const month = built_before_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_before_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_before_local.slice(secondSemiColonIndex + 2,  -1)

		built_before = <h4>Built Before: {month}/{year}</h4>
	}
	if(iihs_input.fcpr_built_after !== null) {
		const built_after_local = iihs_input.fcpr_built_after;
		const firstSemiColonIndex = built_after_local.indexOf(':');
		const firstCommaIndex = built_after_local.indexOf(',');
		const month = built_after_local.slice(firstSemiColonIndex + 1, firstCommaIndex);
		const secondSemiColonIndex = built_after_local.indexOf(':', firstSemiColonIndex + 1)
		const year = built_after_local.slice(secondSemiColonIndex + 2,  -1)

		built_after = <h4>Built After: {month}/{year}</h4>
	}

	if(iihs_input.fcpr_qualifying_text !== null) {
		qualifying_text = <h4>Notes: {iihs_input.fcpr_qualifying_text}</h4>
	}

	if(iihs_input.fcpr_total_points !== null) {
		overall_rating_points = <h3>Front Crash Prevention Rating: {iihs_input.fcpr_total_points}/6</h3>
	}

	if(iihs_input.fcpr_rating_text!== null) {
		overall_rating_text = <h3>Front Crash Prevention Score: {iihs_input.fcpr_rating_text}</h3>
	}

	return (
		<div className='card-layout'>
			{overall_rating_text}
			{overall_rating_points}
			{built_before}
			{built_after}
			{qualifying_text}
		</div>
	)
}


function renderRecall(recall_input, index) {
	return (
		<div key={index}>
			<h3>{recall_input.fields.component}</h3>
		</div>
	)
}

function NHTSA(nhtsa_input) {

	let overallRating = <h3>Vehicle was not tested</h3>
	let overallFrontCrashRating = <h3>Front Crash not rated for this vehicle</h3>
	let frontCrashDriver = <h3>Driver side Front Crash not rated for this vehicle</h3>
	let frontCrashPassenger = <h3>Passenger side Front Crash not tested for this vehicle</h3>
	let overallSideCrashRating = <h3>Side Crash not tested for this vehicle</h3>
	let sideCrashDriver = <h3>Driver side Side Crash not tested for this vehicle</h3>
	let sideCrashPassenger = <h3>Passenger side Side Crash not tested for this vehicle</h3>
	let rolloverRating = <h3>Rollover Crash not tested for this vehicle</h3>
	let sidePoleCrash = <h3>Side Pole Crash not tested for this vehicle</h3>

	if(nhtsa_input.overall_rating !== 'Not Rated') {
		overallRating = <h3>Overall Crash Rating: {nhtsa_input.overall_rating}</h3>
	}

	if(nhtsa_input.overall_front_crash_rating !== 'Not Rated') {
		overallFrontCrashRating = <h3>Overall Front Crash Rating: {nhtsa_input.overall_front_crash_rating}</h3>
	}

	if(nhtsa_input.front_crash_driverside_rating !== 'Not Rated') {
		frontCrashDriver = <h3>Front Crash Driverside Rating: {nhtsa_input.front_crash_driverside_rating}</h3>
	}

	if(nhtsa_input.front_crash_passengerside_rating !== 'Not Rated') {
		frontCrashPassenger = <h3>Front Crash Passengerside Rating: {nhtsa_input.front_crash_passengerside_rating}</h3>
	}

	if(nhtsa_input.overall_side_crash_rating !== 'Not Rated') {
		overallSideCrashRating = <h3>Overall Side Crash Rating: {nhtsa_input.overall_side_crash_rating}</h3>
	}

	if(nhtsa_input.side_crash_driverside_rating !== 'Not Rated') {
		sideCrashDriver = <h3>Side Crash Driverside Rating: {nhtsa_input.side_crash_driverside_rating}</h3>
	}

	if(nhtsa_input.side_crash_passengerside_rating !== 'Not Rated') {
		sideCrashPassenger = <h3>Side Crash Passengerside Rating: {nhtsa_input.side_crash_passengerside_rating}</h3>
	}

	if(nhtsa_input.rollover_rating !== 'Not Rated') {
		rolloverRating = <h3>Rollover Crash Rating: {nhtsa_input.rollover_rating}</h3>
	}

	if(nhtsa_input.side_pole_crash_rating !== 'Not Rated') {
		sidePoleCrash = <h3>Side Pole Crash Rating: {nhtsa_input.side_pole_crash_rating}</h3>
	}

	return (
		<div className='NHTSA-ratings'>
			<h4>NHTSA Crash Test Ratings:</h4>
			<div className='card-layout'>
				{overallRating}
			</div>
			<div className='card-layout'>
				{overallFrontCrashRating}
			</div>
			<div className='card-layout'>
				{frontCrashDriver}
			</div>
			<div className='card-layout'>
				{frontCrashPassenger}
			</div>
			<div className='card-layout'>
				{overallSideCrashRating}
			</div>
			<div className='card-layout'>
				{sideCrashDriver}
			</div>
			<div className='card-layout'>
				{sideCrashPassenger}
			</div>
			<div className='card-layout'>
				{rolloverRating}
			</div>
			<div className='card-layout'>
				{sidePoleCrash}
			</div>
		</div>
	)
}














