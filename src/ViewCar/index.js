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
				{checkParamsIIHS(this.state.iihs)}
				{checkParamsRecall(this.state.recalls)}
				{checkParamsNHTSA(this.state.nhtsa)}
			</div>
		)
	}
}

export default ViewCar;








function checkParamsIIHS(iihs_input) {
	return <h3>{iihs_input.class_name}</h3>
}



function checkParamsRecall(recall_input) {
	return <h3>Number of recalls: {recall_input.length}</h3>
}

function checkParamsNHTSA(nhtsa_input) {
	return <h3>{nhtsa_input.overall_rating}</h3>
}














