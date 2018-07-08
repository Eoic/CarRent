import React, { Component } from 'react';
import { Grid, Segment, Header, Button, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.history.push('/overview');
    }

    render() {
        return (
            <Grid columns={1} centered style={{ height: 'inherit' }}>
                <Grid.Column verticalAlign='middle' style={{ maxWidth: '400px'}}>
                    <Segment.Group raised>
                        <Header as={Segment}>
                            Authentication
                        </Header>
                        <Segment>
                            <Form id='login-form' onSubmit={this.handleSubmit}>
                                <Form.Input type='text' placeholder='Username'/>
                                <Form.Input type='password' placeholder='Password'/>
                            </Form> 
                        </Segment>
                        <Segment>
                            <Button form='login-form' type='submit' color='blue' fluid> Login </Button>
                        </Segment>
                        <Segment>
                            Don't have an account? 
                            <Link to='/register'> Register here </Link>
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(Login);
