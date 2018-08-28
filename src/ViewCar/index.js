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
		console.log(this.state.recalls, 'this is recalls in render')
		return (
			<div>
				<h3>{this.state.iihs.vehicle_description}</h3>
				{IIHS_top_safety(this.state.iihs)}
				{checkParamsNHTSA(this.state.nhtsa)}
				<div className='recalls'>
					{this.state.recalls.map((recall, i) => {
						return renderRecall(recall)
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
	let top_safety_jsx = null;
	let top_safety_year_jsx = null;
	let notes_jsx = null; 

	if(iihs_input.tsp_built_after !== null) {
		var built_after = iihs_input.tsp_built_after;
		var firstSemiColonIndex = built_after.indexOf(':');
		var firstCommaIndex = built_after.indexOf(',');
		var month = built_after.slice(firstSemiColonIndex, firstCommaIndex);
		var secondSemiColonIndex = built_after.indexOf(':', firstSemiColonIndex + 1)
		var year = built_after.slice(secondSemiColonIndex + 1,  -1)

		built_after_jsx = <h4>Built After: {month}/{year}</h4>
	}

	if(iihs_input.top_safety_pick === 'True') {
		top_safety_jsx = <h3>Is Top Safety Pick Plus</h3>
		top_safety_year_jsx = <h3>Top Safety Pick Year: {iihs_input.tsp_year}</h3>
	} else if (iihs_input.tsp_year !== null) {
		top_safety_year_jsx = <h3>Top Safety Pick Year: {iihs_input.tsp_year}</h3>
	}

	if(iihs_input.tsp_qualifying_text !== null) {
		notes_jsx = <h4>Notes: {iihs_input.tsp_qualifying_text}</h4>
	}

	return (
		<div>
			{top_safety_jsx}
			{top_safety_year_jsx}
			{built_after_jsx}
			{notes_jsx}
		</div>
	)
}



function renderRecall(recall_input) {
	return (
		<div>
			<h3>{recall_input.fields.component}</h3>
		</div>
	)
}

function checkParamsNHTSA(nhtsa_input) {
	const check = null
	return (
		<div>
			<h3>{nhtsa_input.overall_rating}</h3>
			{check}

		</div>
	)
}














