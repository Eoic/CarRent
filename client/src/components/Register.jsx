import React, { Component } from 'react';
import { Form, Segment, Grid, Header, Button, Message, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import StickyHeader from './StickyHeader';

class Register extends Component {
    render() {
        return (
            <Grid columns={1} centered style={{ height: 'inherit' }}>
                <StickyHeader/>
                <Grid.Column verticalAlign='middle' style={{ maxWidth: '400px' }}>
                    <Segment.Group raised>
                        <Header as={Segment} inverted color='blue' size='huge'>
                            Registration
                        </Header>
                        <Segment>
                            <Form id='register-form' onSubmit={this.handleSubmit}>
                                <Form.Input icon='user' type='text' placeholder='Username' />
                                <Form.Input icon='mail' type='email' placeholder='Email' />
                                <Form.Input icon='lock' type='password' placeholder='Password' />
                                <Form.Input icon='lock' type='password' placeholder='Repeat password'/>
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