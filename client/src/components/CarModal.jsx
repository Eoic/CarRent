import React, { Component } from 'react';
import { Modal, Button, Form, Icon } from 'semantic-ui-react';
import { addCar } from '../actions/carActions'
import { toast } from 'react-toastify';

class CarModal extends Component {

    constructor() {
        super();

        this.state = {
            carModel: '',
            carRegistrationNumber: '',
            open: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event, data) {
        event.preventDefault();

        if (this.state.carModel.trim() === '' || this.state.carRegistrationNumber.trim() === '')
            toast.error("Fields cannot be empty!");
        else {
            addCar({
                model: this.state.carModel,
                registrationNumber: this.state.carRegistrationNumber
            });
            this.setState({ open: false });
        }
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        return (
            <Modal size='tiny' trigger={<Button icon labelPosition='left' color='blue' onClick={this.handleOpen}> <Icon name='plus square' /> ADD NEW </Button>} closeOnDimmerClick={false} open={this.state.open}>
                <Modal.Header>
                    ADD NEW CAR
                </Modal.Header>
                <Modal.Content>
                    <Form id='car-add-form' onSubmit={this.handleSubmit}>
                        <Form.Input required label='Model' name="carModel" onChange={this.handleChange} />
                        <Form.Input required label='Registration number' name="carRegistrationNumber" onChange={this.handleChange} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive icon='save' labelPosition='left' type='submit' form='car-add-form' color='blue' content='Save' />
                    <Button negative icon='times' labelPosition='left' content='Close' onClick={() => { this.setState({ open: false }) }} />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CarModal;