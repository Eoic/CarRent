import React, { Component } from 'react';
import { Form, Segment, Header, Icon, Statistic, Button, Message } from 'semantic-ui-react';
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

class CarEditForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            value: '',
            details: '',
            model: '',
            registrationNumber: '',
            color: '#000000',
            infoChanged: false,
            carId: this.props.match.params.id,
            costFieldError: false,
            carIncome: 0,
            timesRented: 0,
            rentAdded: false,
            costAdded: false,
            formLoading: true
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
            params: { carId: this.state.carId }
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
            registrationNumber: car.registrationNumber,
            color: car.color,
            formLoading: false
        });
    }

    handleExpensesSubmit() {
        if (this.state.value.trim() === '') {
            toast.error('Please enter a value');
            this.setState({ costFieldError: true });
        } else {
            this.setState({ costFieldError: false, costAdded: true });

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
                color: this.state.color,
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
                        <Form.Group>
                            <Form.Input width={7} label='Model' name='model' value={this.state.model || ''} onChange={this.handleInfoChange} loading={this.state.formLoading} />
                            <Form.Input width={7} label='Registration number' name='registrationNumber' value={this.state.registrationNumber || ''} onChange={this.handleInfoChange} loading={this.state.formLoading} />
                            <Form.Input width={2} label='Color' value={this.state.color} >
                                <input type='color' className='input-color' name='color' value={this.state.color || '#000000'} onChange={this.handleInfoChange} />
                            </Form.Input>
                        </Form.Group>

                        <Form.Button icon labelPosition='left' color='green' disabled={!this.state.infoChanged}>
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
                    {!this.state.costAdded &&
                        <Form id='expenses-form' onSubmit={this.handleExpensesSubmit}>
                            <Form.Group widths='equal'>
                                <Form.Input required icon='euro' error={this.state.costFieldError} type='number' min='0' label='Value' name='value' value={this.state.value} onChange={this.handleExpensesChange} width='2' />
                                <Form.Input label='Details' name='details' required width='13' value={this.state.details} onChange={this.handleExpensesChange} />
                            </Form.Group>
                            <Form.Button icon labelPosition='left' type='submit' color='green'>
                                <Icon name='plus' />
                                Add
                        </Form.Button>
                        </Form>}
                    {this.state.costAdded &&
                        <> <Message color='teal'> Cost added successfully! </Message>
                            <Button icon labelPosition='left' color='linkedin' onClick={() => this.setState({ costAdded: false })}>
                                <Icon name='repeat' />
                                Add another
                        </Button>
                        </>}
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
                    <Statistic>
                        <Statistic.Label> Income per single rent </Statistic.Label>
                        <Statistic.Value>&euro; {(this.state.timesRented !== 0) ? (this.state.carIncome / this.state.timesRented).toFixed(2) : 0}</Statistic.Value>
                    </Statistic>
                </Segment>

            </Segment.Group>
        );
    }
}

export default CarEditForm;