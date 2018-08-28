import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './Header'
import SplashPage from './SplashPage'
import SearchContainer from './SearchContainer'


class App extends Component {
    constructor(){
        super();
        this.state= {
            allModelYears: [],
            //Where car to view, or cars to compare will be stored
            cars: [],
            searchedCar: '',
            splash: true,
            errorMSG: ''
        }
    }

    //This function is empty to change the color of all subsequent functions (Sublime Text 3 bug)
    emptyFunction = () => {
    }

    componentDidMount() {
        this.loadModelYears().then(data => {
            this.setState({
                allModelYears: data
            })
        })
    }

    loadModelYears = async () => {
        try {
            const apiModelYears = await fetch('http://localhost:8000/api/v1/modelyears');

            const apiModelYearsJSON = await apiModelYears.json();

            //filter out results that are 'null' and return
            return apiModelYearsJSON.data.filter(year => year !== 'null')


        } catch (err) {
            console.log(err, 'Error with loadModelYears in App.js');
        }
    }

    viewVehicle = async (vehicle_id) => {
        console.log(vehicle_id)
        try {

            const vehicleInfo = await fetch(`http://localhost:8000/api/v1/vehicleinfo`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({vehicleid: vehicle_id}),
                headers: {
                  'Content-Type': 'application/json'
                }
            })

            const vehicleInfoJSON = await vehicleInfo.json()

            console.log(vehicleInfoJSON.data)
            if(vehicleInfoJSON.status === 200) {
                this.setState({
                    errorMSG: '', 
                    searchedCar: vehicleInfoJSON.data
                })
            }
        } catch (err) {
            console.log(err, 'Error in viewVehicle in App.js');
            this.setState({
                    errorMSG: 'Safety rating for the selected car has not been provided by all organizations. Unable to present incomplete information.'
                })
        }
    }

    changeSplash = () => {
        this.setState({
            splash: false
        })
        this.props.history.push('/search')
    }

    render() {
        return (

            <main>
                <Header />
                <Switch>    
                    {this.state.splash ? <Route path='/' render={() => <SplashPage changeSplash={this.changeSplash} /> } /> : null}
                    <Route exact path='/search' render={() => <SearchContainer errorMSG={this.state.errorMSG} viewVehicle={this.viewVehicle} allModelYears={this.state.allModelYears} /> } />
                </Switch>
            </main>
        )
    }p
}

export default withRouter(App);
