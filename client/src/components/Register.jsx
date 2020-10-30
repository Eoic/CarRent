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
            errors: [],
            showErrors: false,
            accountCreated: false
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
        xhr.open('post', '/register');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
            if(xhr.status === 200){
                this.setState({
                    errors: [],
                    showErrors: false,
                    accountCreated: true
                });
            } else {
                
                const errors = xhr.response.errors ? xhr.response.errors : {};

                this.setState({
                    errors,
                    showErrors: true
                });
            }
        });

        xhr.send(formData)
    }

    componentWillUnmount() {
        this.setState({
            username: '',
            email: '',
            passwordFirst: '',
            passwordSecond: '',
            errors: [],
            showErrors: false,
            accountCreated: false
        })
    }

    render() {
        return (
            <div style={{'backgroundColor': '#1B263B', marginTop: '1rem' }}>
                <Grid columns={1} centered style={{ height: '100vh' }}>
                    <StickyHeader />
                    {!this.state.accountCreated &&
                        <Grid.Column verticalAlign='middle' style={{ maxWidth: '400px' }}>
                            <Segment.Group raised>
                                <Header as={Segment} size='huge'>
                                    NEW ACCOUNT REGISTRATION
                                </Header>
                                <Message as={Segment} hidden={!this.state.showErrors} error textAlign='left'>
                                    {this.state.showErrors ?
                                        <ul>
                                            {this.state.errors.map((key, index) => <li key={index}> {key.msg} </li>)}
                                        </ul> : ''}
                                </Message>
                                <Segment>
                                    <Form id='register-form' onSubmit={this.handleSubmit} autoComplete="off">
                                        <Form.Input name='username' required icon='user' type='text' placeholder='Username' onChange={this.handleChange} />
                                        <Form.Input name='email' required icon='mail' type='email' placeholder='Email' onChange={this.handleChange} />
                                        <Form.Input name='passwordFirst' required icon='lock' type='password' placeholder='Password' onChange={this.handleChange} />
                                        <Form.Input name='passwordSecond' required icon='lock' type='password' placeholder='Repeat password' onChange={this.handleChange} />
                                    </Form>
                                </Segment>
                                <Segment>
                                    <Button form='register-form' type='submit' className={'btn-dark-blue'} fluid> Register </Button>
                                </Segment>
                                <Message info attached='bottom'>
                                    <Icon name='help' />
                                    Already have an account?
                                    <Link to='/'> Login here </Link>
                                </Message>
                            </Segment.Group>
                        </Grid.Column>}
                    {this.state.accountCreated &&
                    <Grid.Column verticalAlign={'middle'} style={{'maxWidth': 600 }}>
                        <Message info header={'Your account has been created!'} align={'justify'} content={
                            <>
                                <p>
                                    You will get an email when administrator verifies your account.
                                    Click {<Link to='/'> <strong> here </strong> </Link>} to open up login page.
                                </p>
                            </>
                        } />
                    </Grid.Column>}
                </Grid>
            </div>
        );
    }
}

export default Register;