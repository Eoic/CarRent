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
            <Segment.Group style={{ borderRadius: '0px'}}>
                <Segment as={Header} color='blue' inverted style={{ borderRadius: '0px'}}>
                    CAR INFO
                </Segment>
                <Segment>
                    <Form id='car-edit-form'>
                        <Form.Group widths='equal'>
                            <Form.Input label='Model'/>
                            <Form.Input label='Registration number' />
                        </Form.Group>
                        <Form.Button color='green'> 
                            <Icon name='save'/>
                            Save changes 
                        </Form.Button>
                    </Form>
                </Segment>

                <Segment as={Header} color='blue' inverted>
                    EXPENSES
                </Segment>
                <Segment>
                    <Form id='expenses-form' onSubmit={this.handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input icon='euro' label='Value' name='value' width='2'/>
                            <Form.Input label='Details' name='details' width='14'/>
                        </Form.Group>
                        <Form.Button type='submit' icon='plus' color='green'> 
                            <Icon name='plus'/>
                            Add
                        </Form.Button>
                    </Form>
                    <ExpensesTable/>
                </Segment>
                
                <Segment as={Header} inverted color='blue'>
                    LEASE
                </Segment>
                <Segment style={{ borderRadius: '0px'}}>
                    <Button color='violet'>
                        <Icon name='print'/>
                        Print
                    </Button>
                </Segment>

            </Segment.Group>
        );
    }
}

export default CarEditForm;