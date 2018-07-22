import React, { Component } from 'react';
import { Grid, Segment, Header, Button, Form, Message, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import StickyHeader from './StickyHeader';
import { login } from '../actions/appActions';
import store from '../stores/AppStore';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errors: [],
            showErrors: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    componentDidMount() {
        store.addListener('loginError', this.handleErrors);
        store.addListener('loginSuccess', this.handleSuccess);
    }

    componentWillUnmount() {
        store.removeListener('loginError', this.handleErrors);
        store.removeListener('loginSuccess', this.handleSuccess);
    }

    handleErrors() {
        this.setState({
            errors: store.getErrors(),
            showErrors: true
        });
    }

    handleSuccess() {
        this.setState({ showErrors: false });
        //this.props.history.push('/overview');
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        login({
            username: this.state.username,
            password: this.state.password
        });
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
                                {(this.state.showErrors) ? this.state.errors.map((error, index) =>
                                    <p key={index}> {error.msg} </p>
                                ) : ''}
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

export default withRouter(Login);
