import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header'
import SplashPage from './SplashPage'
import SearchContainer from './SearchContainer'


class App extends Component {
    constructor(){
        super();
        this.state= {
            allModelYears: []
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

    render() {
        return (
            <main>
                <Header />
                <Switch>    
                    <Route exact path='/' render={() => <SplashPage /> } />
                    <Route exact path='/search' render={() => <SearchContainer allModelYears={this.state.allModelYears} /> } />
                </Switch>
            </main>
        )
    }
}

export default withRouter(App);
