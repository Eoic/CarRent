import React, { Component } from 'react';
import { getCars, getCarById, updateCar } from '../actions/carActions';
import store from '../stores/CarStore';
import { Form, Segment, Header, Button, Icon } from 'semantic-ui-react';
import ExpensesTable from './ExpensesTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CarEditForm extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            model: '',
            registrationNumber: '',
            infoChanged: false,
            carId: this.props.match.params.id
        };
        this.handleInfoSubmit = this.handleInfoSubmit.bind(this);
        this.handleExpensesSubmit = this.handleExpensesSubmit.bind(this);
        this.handleInfoChange = this.handleInfoChange.bind(this);
        this.fillForm = this.fillForm.bind(this);
    }

    componentWillMount(){
        getCarById(this.state.carId);
    }

    componentDidMount(){
        store.on('dataReceived', this.fillForm);
    }

    componentWillUnmount(){
        store.removeListener('dataReceived', this.fillForm);
    }

    fillForm(){
        const car = store.getCarById();
        this.setState({
            model: car.model,
            registrationNumber: car.registrationNumber
        });
    }

    handleExpensesSubmit(){
        
    }

    handleInfoSubmit(){
        this.setState({ infoChanged: false });

        const car = {
            model: this.state.model,
            registrationNumber: this.state.registrationNumber
        }

        updateCar(this.state.carId, car);
        toast.success('Changes saved.');
    }

    handleInfoChange(event){
        this.setState({
            [event.target.name]: event.target.value,
            infoChanged: true
        });
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
                            <Form.Input icon='euro' label='Value' name='value' width='2'/>
                            <Form.Input label='Details' name='details' width='14'/>
                        </Form.Group>
                        <Form.Button type='submit' color='green'> 
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
                        Invoice
                    </Button>
                </Segment>

            </Segment.Group>
        );
    }
}

export default CarEditForm;