import React, { Component } from 'react';
import { Form, Segment, Grid, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends Component {
    render() {
        return (
            <Grid columns={1} centered style={{ height: 'inherit' }}>
                <Grid.Column verticalAlign='middle' style={{ maxWidth: '400px' }}>
                    <Segment.Group raised>
                        <Header as={Segment}>
                            Registration
                        </Header>
                        <Segment>
                            <Form id='register-form' onSubmit={this.handleSubmit}>
                                <Form.Input type='text' placeholder='Username' />
                                <Form.Input type='email' placeholder='Email' />
                                <Form.Input type='password' placeholder='Password' />
                                <Form.Input type='password' placeholder='Repeat password'/>
                            </Form>
                        </Segment>
                        <Segment>
                            <Button form='register-form' type='submit' color='blue' fluid> Register </Button>
                        </Segment>
                        <Segment>
                            Already have an account?
                            <Link to='/'> Login here </Link>
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;