import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './Header'
import SplashPage from './SplashPage'
import SearchContainer from './SearchContainer'
import ViewCar from './ViewCar'
import CompareCars from './CompareCars'


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

            if(vehicleInfoJSON.status === 200) {
                this.setState({
                    errorMSG: '', 
                    searchedCar: vehicleInfoJSON.data
                })
                this.props.history.push('/view')
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

    compareCar = () => {
        this.setState({
            cars: [...this.state.cars, this.state.searchedCar]
        })
        this.props.history.push('/compare')
    }

    removeCar = (carToRemove) => {
        const allCars = this.state.cars;
        const updatedCarsList = allCars.filter(car => car.nhtsa[0].fields.vehicle_description !== carToRemove)

        this.setState({
            cars: updatedCarsList
        })
    }

    carToView = (carToView) => {
        const viewCar = this.state.cars.filter(car =>  car.nhtsa[0].fields.vehicle_description === carToView)
        this.setState({
            searchedCar: viewCar[0]
        })
        this.props.history.push('/view')
    }

    render() {
        return (

            <main>
                <Header />
                <Switch>    
                    {this.state.splash ? <Route path='/' render={() => <SplashPage changeSplash={this.changeSplash} /> } /> : null}
                    <Route exact path='/search' render={() => <SearchContainer errorMSG={this.state.errorMSG} viewVehicle={this.viewVehicle} allModelYears={this.state.allModelYears} /> } />
                    {this.state.searchedCar === '' ? null : <Route exact path='/view' render={() => <ViewCar searchedCar={this.state.searchedCar} compareCar={this.compareCar} /> } />}
                    <Route path='/' render={() => <CompareCars carToView={this.carToView} cars={this.state.cars} removeCar={this.removeCar} /> } />
                </Switch>
            </main>
        )
    }p
}

export default withRouter(App);
