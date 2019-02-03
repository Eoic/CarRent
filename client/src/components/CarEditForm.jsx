import React, { Component } from 'react';
import { Form, Segment, Header, Icon, Statistic } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

// Flux.
import { getCarById, updateCar, addCost, carRentIncome } from '../actions/carActions';
import store from '../stores/CarStore';

// Components.
import ExpensesTable from './ExpensesTable';
import RentForm from './RentForm';

// Toast.
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import RentSummary from './RentSummary';

class CarEditForm extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
            value: '',
            details: '',
            model: '',
            registrationNumber: '',
            infoChanged: false,
            carId: this.props.match.params.id,
            costFieldError: false,
            carIncome: 0,
            timesRented: 0,
            rentAdded: false
        }

        this.state = this.initialState;
        this.handleInfoSubmit = this.handleInfoSubmit.bind(this);
        this.handleExpensesSubmit = this.handleExpensesSubmit.bind(this);
        this.handleInfoChange = this.handleInfoChange.bind(this);
        this.fillForm = this.fillForm.bind(this);
        this.handleExpensesChange = this.handleExpensesChange.bind(this);
        this.updateIncome = this.updateIncome.bind(this);
    }

    updateIncome() {
        this.setState({ carIncome: store.getCarIncome() });
    }

    componentDidMount() {
        store.on('storeUpdated', this.fillForm);
        store.on('incomeReceived', this.updateIncome);
        store.on('requestFailed', this.handleError);

        getCarById(this.state.carId);
        carRentIncome(this.state.carId);

        axios.get('/api/rents/times-rented', {
            params: {
                carId: this.state.carId
            }
        }).then(response => {
            this.setState({ timesRented: response.data.count });
        });
    }

    componentWillUnmount() {
        store.removeListener('storeUpdated', this.fillForm);
        store.removeListener('requestFailed', this.handleError);
        store.removeListener('incomeReceived', this.updateIncome);
    }

    handleError() {
        toast.error(store.getErrorMsg());
    }

    fillForm() {
        const car = store.getCarById();

        this.setState({
            model: car.model,
            registrationNumber: car.registrationNumber
        });
    }

    handleExpensesSubmit() {

        if (this.state.value.trim() === '') {
            toast.error('Please enter a value');
            this.setState({ costFieldError: true });
        } else {
            this.setState({ costFieldError: false });

            const cost = {
                carId: this.state.carId,
                value: this.state.value,
                details: this.state.details
            }

            addCost(cost);
        }
    }

    handleInfoSubmit() {
        this.setState({ infoChanged: false });

        if (this.state.model.trim() === '' || this.state.registrationNumber.trim() === '') {
            toast.error('Field cannot be empty.');
        } else {
            const car = {
                model: this.state.model,
                registrationNumber: this.state.registrationNumber,
                id: this.state.carId
            }

            updateCar(car);
        }
    }

    handleInfoChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            infoChanged: true
        });
    }

    handleExpensesChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleRentSuccess(message) {
        toast.success(message)
        this.setState({ rentAdded: true })
    }

    render() {
        return (
            <Segment.Group>
                <Segment as={Header} color='blue' inverted>
                    CAR INFO
                </Segment>
                <Segment>
                    <Form id='car-edit-form' onSubmit={this.handleInfoSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input label='Model' name='model' value={this.state.model} onChange={this.handleInfoChange} />
                            <Form.Input label='Registration number' name='registrationNumber' value={this.state.registrationNumber} onChange={this.handleInfoChange} />
                        </Form.Group>
                        <Form.Button color='green' disabled={!this.state.infoChanged}>
                            <Icon name='save' />
                            Save changes
                        </Form.Button>
                    </Form>
                </Segment>

                <Segment as={Header} inverted color='blue'>
                    RENT
                </Segment>
                <Segment>
                    <RentForm carId={this.state.carId} />
                </Segment>

                <Segment as={Header} color='blue' inverted>
                    EXPENSES
                </Segment>
                <Segment>
                    <Form id='expenses-form' onSubmit={this.handleExpensesSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input required icon='euro' error={this.state.costFieldError} label='Value' name='value' value={this.state.value} onChange={this.handleExpensesChange} width='2' />
                            <Form.Input label='Details' name='details' width='13' value={this.state.details} onChange={this.handleExpensesChange} />
                        </Form.Group>
                        <Form.Button type='submit' color='green'>
                            <Icon name='plus' />
                            Add
                        </Form.Button>
                    </Form>
                    <ExpensesTable carId={this.props.match.params.id} />
                </Segment>

                <Segment as={Header} inverted color='blue'>
                    Statistics
                </Segment>
                <Segment>
                    <Statistic color='green'>
                        <Statistic.Label> Income &nbsp; </Statistic.Label>
                        <Statistic.Value> &euro; {this.state.carIncome} </Statistic.Value>
                    </Statistic>
                    <Statistic>
                        <Statistic.Label> Times rented &nbsp; </Statistic.Label>
                        <Statistic.Value> {this.state.timesRented} </Statistic.Value>
                    </Statistic>
                </Segment>

            </Segment.Group>
        );
    }
}

export default CarEditForm;