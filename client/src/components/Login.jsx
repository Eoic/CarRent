import React, { Component } from 'react';
import { Segment, Button, Form, Message, Grid, Icon, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import StickyHeader from './StickyHeader';
import PropTypes from 'prop-types';
import Auth from '../utils/authorize';
import axios from 'axios';
import Link from "react-router-dom/Link";

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
            <div style={{'backgroundColor': '#1B263B', marginTop: '1rem' }}>
                <Grid columns={1} centered style={{ height: '100vh' }} >
                    <StickyHeader />
                    <Grid.Column verticalAlign='middle' style={{ maxWidth: '400px' }}>
                        <Segment.Group raised>
                            <Header as={Segment} size='huge'>
                                MEMBER LOGIN
                            </Header>
                            <Message as={Segment} hidden={!this.state.showErrors} error textAlign='left'>
                                {(this.state.showErrors) ? this.state.errors.map((key, index) => <p key={index}> {key} </p>) : ''}
                            </Message>
                            <Segment>
                                <Form id='login-form' onSubmit={this.handleSubmit}>
                                    <Form.Input autoComplete='username' required name='username' icon='user' type='text' placeholder='Username' onChange={this.handleChange} />
                                    <Form.Input autoComplete='current-password' required name='password' icon='lock' type='password' placeholder='Password' onChange={this.handleChange} />
                                    <Button fluid className='btn-dark-blue' form='login-form' type='submit'> LOGIN </Button>
                                </Form>
                            </Segment>
                            <Message info attached='bottom'>
                                <Icon name='help' /> Don't have an account?
                                <Link to='/register'> Register here </Link>
                            </Message>
                        </Segment.Group>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
};

export default withRouter(Login);
