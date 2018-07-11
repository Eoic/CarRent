import React, { Component } from 'react';
import { Grid, Segment, Header, Button, Form, Message, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import StickyHeader from './StickyHeader';
 
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
                <StickyHeader/>
                <Grid.Column verticalAlign='middle' style={{ maxWidth: '400px'}}>
                    <Segment.Group raised>
                        <Header as={Segment} inverted color='blue' size='huge'>
                            Authentication
                        </Header>
                        <Segment>
                            <Form id='login-form' onSubmit={this.handleSubmit}>
                                <Form.Input icon='user' type='text' placeholder='Username'/>
                                <Form.Input icon='lock' type='password' placeholder='Password' autoComplete="off"/>
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
