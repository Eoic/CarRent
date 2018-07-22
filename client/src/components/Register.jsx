import React, { Component } from 'react';
import { Form, Segment, Grid, Header, Button, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import StickyHeader from './StickyHeader';

class Register extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            email: '',
            passwordFirst: '',
            passwordSecond: '',
            errors: {},
            showErrors: false
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
        const email = encodeURIComponent(this.state.email);
        const passwordFirst = encodeURIComponent(this.state.passwordFirst);
        const passwordSecond = encodeURIComponent(this.state.passwordSecond);
        const formData = `username=${username}&email=${email}&passwordFirst=${passwordFirst}&passwordSecond=${passwordSecond}`;

        // AJAX.
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/users/register');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
            if(xhr.status === 200){
                this.setState({
                    errors: {},
                    showErrors: false
                });

                localStorage.setItem('successMessage', xhr.response.message);
                this.props.history.push('/');
            } else {
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors,
                    showErrors: true
                });
            }
        });

        xhr.send(formData)
    }

    render() {
        return (
            <Grid columns={1} centered style={{ height: 'inherit' }}>
                <StickyHeader />
                <Grid.Column verticalAlign='middle' style={{ maxWidth: '400px' }}>
                    <Segment.Group raised>
                        <Header as={Segment} inverted color='blue' size='huge'>
                            Registration
                        </Header>
                        <Message as={Segment} hidden={!this.state.showErrors} error textAlign='left'>
                                { (this.state.showErrors) ? Object.keys(this.state.errors).map((key, index) => <p key={index}> { this.state.errors[key] } </p>) : '' }
                        </Message>
                        <Segment>
                            <Form id='register-form' onSubmit={this.handleSubmit}>
                                <Form.Input name='username' icon='user' type='text' placeholder='Username' onChange={this.handleChange} />
                                <Form.Input name='email' icon='mail' type='email' placeholder='Email' onChange={this.handleChange} />
                                <Form.Input name='passwordFirst' icon='lock' type='password' placeholder='Password' onChange={this.handleChange} />
                                <Form.Input name='passwordSecond' icon='lock' type='password' placeholder='Repeat password' onChange={this.handleChange} />
                            </Form>
                        </Segment>
                        <Segment>
                            <Button form='register-form' type='submit' color='blue' fluid> Register </Button>
                        </Segment>
                        <Message warning attached='bottom'>
                            <Icon name='help' />
                            Already have an account?
                            <Link to='/'> Login here </Link>
                        </Message>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;