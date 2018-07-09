import React, { Component } from 'react';
import { getCarById } from '../actions/carActions';
import { Form, Segment, Header, Button, Icon, Table } from 'semantic-ui-react';
import ExpensesTable from './ExpensesTable';

class CarEditForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        console.log('Submitted');
    }

    render() {
        return (
            <Segment.Group>
                <Segment>
                    <p> Route ID: {this.props.match.params.id} </p>
                </Segment>

                <Segment as={Header} color='blue' inverted>
                    CAR INFO
                </Segment>
                <Segment>
                    <Form id='car-edit-form'>
                        <Form.Group>
                            <Form.Input label='Model' width='7' />
                            <Form.Input label='Registration number' width='7' />
                            <Form.Input label='Value' icon='euro'/>
                        </Form.Group>
                    </Form>
                </Segment>

                <Segment as={Header} color='blue' inverted>
                    EXPENSES
                </Segment>
                <Segment>
                    <Form id='expenses-form' onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Input icon='euro' placeholder='Value' name='value' width='2' style={{ marginTop: '5px' }}/>
                            <Form.TextArea placeholder='Details' name='details' width='12' style={{ minHeight: '38px', maxHeight: '76px', marginTop: '5px' }}/>
                            <Form.Button type='submit' icon='plus' color='linkedin' style={{ marginTop: '5px'}} />
                        </Form.Group>
                    </Form>
                    <ExpensesTable/>
                </Segment>
                
                <Segment as={Header} inverted color='blue'>
                    LEASE
                </Segment>
                <Segment>

                </Segment>

            </Segment.Group>
        );
    }
}

export default CarEditForm;