import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { addCar } from '../actions/carActions'

class CarModal extends Component {

    constructor() {
        super();
        this.state = {
            carModel: '',
            carRegistrationNumber: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.carRegistrationNumber);
    }

    handleSubmit(event, data) {
        event.preventDefault();

        addCar({
            model: this.state.carModel,
            registrationNumber: this.state.carRegistrationNumber
        });
    }

    render() {
        return (
            <Modal trigger={this.props.children} closeOnDimmerClick={false} closeIcon centered={false}>
                <Modal.Header>
                    ADD NEW CAR
                </Modal.Header>
                <Modal.Content>
                    <Form id='car-add-form' onSubmit={this.handleSubmit}>
                        <Form.Input label='Model' name="carModel" onChange={this.handleChange} />
                        <Form.Input label='Registration number' name="carRegistrationNumber" onChange={this.handleChange} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button type='submit' form='car-add-form' color='blue'> Save </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CarModal;