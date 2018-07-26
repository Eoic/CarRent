import React, { Component } from 'react';
import { Grid, Segment, Header, Button, Form, Message, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import StickyHeader from './StickyHeader';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';

class Login extends Component {

    constructor(props, context) {
        super(props, context);

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if(storedMessage){
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        this.state = {
            errors: {},
            showErrors: false,
            successMessage,
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
        xhr.open('post', '/api/users/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
            if(xhr.status === 200){

                // Success.
                this.setState({
                    errors: {},
                    showErrors: false
                });

                // Save token.
                Auth.authenticateUser(xhr.response.token);

                // Update authenticated state.
                // Toggle authenticate.

                // Redirect.
                this.props.history.push('/overview');
            } else {
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
            <Grid columns={1} centered style={{ height: 'inherit' }}>
                <StickyHeader />
                <Grid.Column verticalAlign='middle' style={{ maxWidth: '400px' }}>
                    <Segment.Group raised>
                        <Header as={Segment} inverted color='blue' size='huge'>
                            Authentication
                        </Header>
                        <Message as={Segment} hidden={!this.state.showErrors} error textAlign='left'>
                                { (this.state.showErrors) ? Object.keys(this.state.errors).map((key, index) => <p key={index}> { this.state.errors[key] } </p>) : '' }
                        </Message>
                        <Segment>
                            <Form id='login-form' onSubmit={this.handleSubmit}>
                                <Form.Input name='username' icon='user' type='text' placeholder='Username' onChange={this.handleChange} />
                                <Form.Input name='password' icon='lock' type='password' placeholder='Password' onChange={this.handleChange} autoComplete="off" />
                            </Form>
                        </Segment>
                        <Segment>
                            <Button form='login-form' type='submit' color='blue' fluid> Login </Button>
                        </Segment>
                        <Message warning attached='bottom'>
                            <Icon name='help' />
                            Don't have an account?
                            <Link to='/register'> Register here </Link>
                        </Message>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
};

export default withRouter(Login);
