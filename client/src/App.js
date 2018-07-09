import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// Components.
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Register from './components/Register';

// Sidebar views.
import Overview from './components/Overview';
import Cars from './components/Cars';
import Reports from './components/Reports';
import Settings from './components/Settings';
import CarEditForm from './components/CarEditForm';

class App extends Component {
	render() {
		return (
			<div className="App" style={{ height: '100%'}}>
				<BrowserRouter>
						<Switch>
							<Route exact path='/' component={Login}/>
							<Route exact path='/register' component={Register}/>
							<Sidebar>
								<Route path='/overview' component={Overview}/>
								<Route path='/cars' component={Cars}/>
								<Route path='/car/:id' component={CarEditForm}/>
								<Route path='/reports' component={Reports}/>
								<Route path='/settings' component={Settings}/>
							</Sidebar>
						</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
