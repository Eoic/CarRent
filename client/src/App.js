import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

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
import { ToastContainer } from '../node_modules/react-toastify';

// Authentication.
import Auth from './utils/authorize';
import Logout from './components/Logout';
import axios from 'axios';
import Profile from './components/Profile';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
	  Auth.isUserAuthenticated() ? (<Component {...props} {...rest} />) : (
		<Redirect to={{
		  pathname: '/',
		  state: { from: props.location }
		}}/>
	  )
	)}/>
);

const PublicRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
	  Auth.isUserAuthenticated() ? (
		<Redirect to={{
		  pathname: '/overview',
		  state: { from: props.location }
		}}/>
	  ) : (
		<Component {...props} {...rest} />
	  )
	)}/>
	);
	
	
const token = Auth.getToken();
axios.defaults.headers.common['x-access-token'] = (token) ? token : null;

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			authenticated: false
		}
	}

	componentDidMount(){
		this.toggleAuthenticateStatus();
	}

	toggleAuthenticateStatus(){
		this.setState({ authenticated: Auth.isUserAuthenticated });
	}

	render() {
		return (
			<div className="App" style={{ height: '100%'}}>
				<BrowserRouter>
						<Switch>
							<PublicRoute exact path='/' component={Login} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
							<PublicRoute exact path='/register' component={Register} />
							<Route exact path='/logout' component={Logout} />
							<Sidebar>
								<PrivateRoute path='/overview' component={Overview}/>
								<PrivateRoute path='/cars' component={Cars}/>
								<PrivateRoute path='/car/:id' component={CarEditForm}/>
								<PrivateRoute path='/reports/:active/:reserved/:ended' component={Reports}/>
								<PrivateRoute path='/settings' component={Settings}/>
								<PrivateRoute path='/profile' component={Profile}/>
							</Sidebar>
						</Switch>
				</BrowserRouter>
				<ToastContainer/>
			</div>
		);
	}
}

export default App;
