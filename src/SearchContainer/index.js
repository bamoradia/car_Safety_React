import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';


class SearchContainer extends Component {
	constructor() {
		super();
		this.state = {
			currentModelYear: '',
			allMakes: [],
			currentMake: '',
			allModels: [],
			currentModel: '',
			allTrims: [],
			currentTrim: []
		}
	}

	//This function is empty to change the color of all subsequent functions (Sublime Text 3 bug)
    emptyFunction = () => {
    }

    //used to get vehicle information once all options are picked by user
    handleSubmit = async (e) => {
    	e.preventDefault();
    	 try {



    	 } catch (err) {
    	 	console.log(err, 'Error in handleSubmit in SearchContainer')
    	 }
    }

    modelYearChange = async (e) => {
    	e.preventDefault();
    	try {

    		const currentModelYear = e.target.value;

    		const allMakes = await fetch(`http://localhost:8000/api/v1/makes`, {
			    method: 'POST',
			    credentials: 'include',
			    body: JSON.stringify({year: currentModelYear}),
			    headers: {
			      'Content-Type': 'application/json'
			    }
    		})

    		const allMakesJSON = await allMakes.json();
			
    		this.setState({
    			currentModelYear: currentModelYear,
    			allMakes: allMakesJSON.data,
    			currentMake: '',
				allModels: [],
				currentModel: '',
				allTrims: [],
				currentTrim: []
    		})
    	} catch (err) {
    		console.log(err, 'Error in modelYearChange in SearchContainer');
    	}
    }

    makeChange = async (e) => {
    	e.preventDefault();

    	try {	
    		const currentMake = e.target.value;

    		const allModels = await fetch(`http://localhost:8000/api/v1/models`, {
			    method: 'POST',
			    credentials: 'include',
			    body: JSON.stringify({year: this.state.currentModelYear, make: currentMake}),
			    headers: {
			      'Content-Type': 'application/json'
			    }
    		})

    		const allModelsJSON = await allModels.json();

    		this.setState({
    			currentMake: currentMake,
				allModels: allModelsJSON.data,
				currentModel: '',
				allTrims: [],
				currentTrim: []
    		})

    	} catch (err) {
    		console.log(err, 'Error in makeChange in SearchContainer');
    	}
    }

    modelChange = async (e) => {
    	e.preventDefault();

    	try {	
    		const currentModel = e.target.value;

    		const allTrims = await fetch(`http://localhost:8000/api/v1/trims`, {
			    method: 'POST',
			    credentials: 'include',
			    body: JSON.stringify({year: this.state.currentModelYear, make: this.state.currentMake, model: currentModel}),
			    headers: {
			      'Content-Type': 'application/json'
			    }
    		})

    		const allTrimsJSON = await allTrims.json();

    		this.setState({
				currentModel: currentModel,
				allTrims: allTrimsJSON.data,
				currentTrim: []
    		})

    	} catch (err) {
    		console.log(err, 'Error in modelChange in SearchContainer');
    	}
    }


	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<select name='modelYear' onChange={this.modelYearChange}>
						<option>Please Select a Model Year</option>
						{this.props.allModelYears.map((modelYear, i) => {
							return <option value={modelYear} key={i}>{modelYear}</option>
						})}
					</select>

					{this.state.allMakes.length == 0 ? null : 
						<select name='make' onChange={this.makeChange}>
							<option>Please Select a Make</option>
							{this.state.allMakes.map((make, i) => {
								return <option value={make} key={i}>{make}</option>
							})}
						</select>
					}

					{this.state.allModels.length == 0 ? null : 
						<select name='model' onChange={this.modelChange}>
							<option>Please Select a Model</option>
							{this.state.allModels.map((model, i) => {
								return <option value={model} key={i}>{model}</option>
							})}
						</select>
					}

					{this.state.allTrims.length == 0 ? null : 
						<select name='model' onChange={this.trimChange}>
							<option>Please Select a Trim</option>
							{this.state.allTrims.map((trim, i) => {
								return <option value={trim.vehicle_id} key={i}>{trim.trim}</option>
							})}
						</select>
					}



				</form>


			</div>
		)
	}
}


export default SearchContainer