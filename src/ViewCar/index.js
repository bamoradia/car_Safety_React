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
		return (
			<div>
				<h3>{this.state.iihs.vehicle_description}</h3>
				{IIHS_top_safety(this.state.iihs)}
				{checkParamsRecall(this.state.recalls)}
				{checkParamsNHTSA(this.state.nhtsa)}
			</div>
		)
	}
}

export default ViewCar;








function IIHS_top_safety(iihs_input) {
	if(iihs_input.top_safety_pick === true) {
		if(iihs_input.tsp_qualifying_text !== null) {
			if(iihs_input.tsp_built_after !== null) {
				return (
					<div>
						<h3>Is Top Safety Pick Plus</h3>
						<h3>{iihs_input.tsp_year}</h3>
						<h4>{iihs_input.tsp_built_after}</h4>
						<h4>{iihs_input.tsp_qualifying_text}</h4>
					</div>
				)
			} else {
				return (
					<div>
						<h3>Is Top Safety Pick Plus</h3>
						<h3>{iihs_input.tsp_year}</h3>
						<h4>{iihs_input.tsp_qualifying_text}</h4>
					</div>
				)
			}
		} else if(iihs_input.tsp_built_after !== null) {
			return (
				<div>
					<h3>Is Top Safety Pick Plus</h3>
					<h3>{iihs_input.tsp_year}</h3>
					<h4>{iihs_input.tsp_built_after}</h4>
				</div>
			)
		} else {
			return (
				<div>
					<h3>Is Top Safety Pick Plus</h3>
					<h3>{iihs_input.tsp_year}</h3>
				</div>
			)
		}
	} else if (iihs_input.tsp_year !== null) {
		if(iihs_input.tsp_qualifying_text !== null) {
			if(iihs_input.tsp_built_after !== null) {
				<div>
					<h3>Is Top Safety Pick</h3>
					<h3>{iihs_input.tsp_year}</h3>
					<h4>{iihs_input.tsp_built_after}</h4>
					<h4>{iihs_input.tsp_qualifying_text}</h4>
				</div>
			} else {
				return (
					<div>
						<h3>Is Top Safety Pick</h3>
						<h3>{iihs_input.tsp_year}</h3>
						<h4>{iihs_input.tsp_qualifying_text}</h4>
					</div>
				)
			}
		} else if(iihs_input.tsp_built_after !== null) {
			return (
				<div>
					<h3>Is Top Safety Pick</h3>
					<h3>{iihs_input.tsp_year}</h3>
					<h4>{iihs_input.tsp_built_after}</h4>
				</div>
			)
		} else {
			return (
				<div>
					<h3>Is Top Safety Pick Plus</h3>
					<h3>{iihs_input.tsp_year}</h3>
				</div>
			)
		}
	} else {
		return <h3>Not a Top Safety Pick</h3>
	}
}



function checkParamsRecall(recall_input) {
	return <h3>Number of recalls: {recall_input.length}</h3>
}

function checkParamsNHTSA(nhtsa_input) {
	return (
		<div>
			<h3>{nhtsa_input.overall_rating}</h3>

		</div>
	)
}














