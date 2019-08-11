import React, { Component } from 'react';
import { Segment, Button, Form, Message /*, Icon */ } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import StickyHeader from './StickyHeader';
import PropTypes from 'prop-types';
import Auth from '../utils/authorize';
//import { Link } from 'react-router-dom';
import axios from 'axios';


class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {},
            showErrors: false,
            username: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const username = encodeURIComponent(this.state.username);
        const password = encodeURIComponent(this.state.password);
        const formData = `username=${username}&password=${password}`;

        // AJAX request.
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                // Success.
                this.setState({
                    errors: {},
                    showErrors: false
                });

                // Save JWT token.
                Auth.authenticateUser(xhr.response.token);

                const token = Auth.getToken();
                axios.defaults.headers.common['x-access-token'] = (token) ? token : null;

                // Redirect.
                this.props.history.push('/overview');
            }
            else {
                // Failed.
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                this.setState({ errors, showErrors: true });
            }
        });

        xhr.send(formData);
    }

    render() {
        return (
            <div className='login-wrapper'>
                <StickyHeader/>
                <div className='login-form-container'>
                    <Message as={Segment} hidden={!this.state.showErrors} error textAlign='left'>
                        {(this.state.showErrors) ? this.state.errors.map((key, index) => <p key={index}> {key} </p>) : ''}
                    </Message>
                    <Form id='login-form' onSubmit={this.handleSubmit}>
                        <Form.Input autoComplete='username' required name='username' icon='user' type='text' placeholder='Username' onChange={this.handleChange} size='huge' />
                        <Form.Input autoComplete='current-password' required name='password' icon='lock' type='password' placeholder='Password' onChange={this.handleChange} size='huge' />
                        <Button fluid className='login-button' size='huge' form='login-form' type='submit'> LOGIN </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
};

export default withRouter(Login);
