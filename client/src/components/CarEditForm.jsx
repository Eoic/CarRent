import React, { Component } from 'react';
import { Form, Segment, Header, Button, Icon } from 'semantic-ui-react';

// Flux.
import { getCarById, updateCar, addCost } from '../actions/carActions';
import store from '../stores/CarStore';

// Components.
import ExpensesTable from './ExpensesTable';

// Toast.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CarEditForm extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: '',
            details: '',
            model: '',
            registrationNumber: '',
            infoChanged: false,
            carId: this.props.match.params.id
        };
        this.handleInfoSubmit = this.handleInfoSubmit.bind(this);
        this.handleExpensesSubmit = this.handleExpensesSubmit.bind(this);
        this.handleInfoChange = this.handleInfoChange.bind(this);
        this.fillForm = this.fillForm.bind(this);
        this.handleExpensesChange = this.handleExpensesChange.bind(this)
    }

    componentDidMount(){
        store.on('storeUpdated', this.fillForm);
        getCarById(this.state.carId);
    }

    componentWillUnmount(){
        store.removeListener('storeUpdated', this.fillForm);
    }

    fillForm(){
        const car = store.getCarById();
        
        this.setState({
            model: car.model,
            registrationNumber: car.registrationNumber
        });
    }

    handleExpensesSubmit(){
        const cost = {
            carId: this.state.carId,
            value: this.state.value,
            details: this.state.details
        }

        addCost(cost);
        toast.success('Successfully added.');
    }

    handleInfoSubmit(){
        this.setState({ infoChanged: false });

        const car = {
            model: this.state.model,
            registrationNumber: this.state.registrationNumber,
            id: this.state.carId
        }

        updateCar(car);
        toast.success('Changes saved.');
    }

    handleInfoChange(event){
        this.setState({
            [event.target.name]: event.target.value,
            infoChanged: true
        });
    }

    handleExpensesChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <Segment.Group style={{ borderRadius: '0px'}}>
                <ToastContainer/>
                <Segment as={Header} color='blue' inverted style={{ borderRadius: '0px'}}>
                    CAR INFO
                </Segment>
                <Segment>
                    <Form id='car-edit-form' onSubmit={this.handleInfoSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input label='Model' name='model' value={this.state.model} onChange={this.handleInfoChange}/>
                            <Form.Input label='Registration number' name='registrationNumber' value={this.state.registrationNumber} onChange={this.handleInfoChange} />
                        </Form.Group>
                        <Form.Button color='green' disabled={!this.state.infoChanged}> 
                            <Icon name='save'/>
                            Save changes 
                        </Form.Button>
                    </Form>
                </Segment>

                <Segment as={Header} color='blue' inverted>
                    EXPENSES
                </Segment>
                <Segment>
                    <Form id='expenses-form' onSubmit={this.handleExpensesSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input icon='euro' label='Value' name='value' value={this.state.value} onChange={this.handleExpensesChange} width='2'/>
                            <Form.Input label='Details' name='details' width='14' value={this.state.details} onChange={this.handleExpensesChange}/>
                        </Form.Group>
                        <Form.Button type='submit' color='green'> 
                            <Icon name='plus'/>
                            Add
                        </Form.Button>
                    </Form>
                    <ExpensesTable carId={this.state.carId}/>
                </Segment>
                
                <Segment as={Header} inverted color='blue'>
                    LEASE
                </Segment>
                <Segment style={{ borderRadius: '0px'}}>
                    <Button color='violet'>
                        <Icon name='print'/>
                        Invoice
                    </Button>
                </Segment>

            </Segment.Group>
        );
    }
}

export default CarEditForm;