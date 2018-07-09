import React, { Component } from 'react';
import { Modal, Button, Form, Icon } from 'semantic-ui-react';
import { addCar } from '../actions/carActions'

class CarModal extends Component {

    constructor() {
        super();

        this.state = {
            carModel: '',
            carRegistrationNumber: '',
            status: 'Available',
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

        // Close after validating fields.
        this.setState({ open: false });

        addCar({
            model: this.state.carModel,
            registrationNumber: this.state.carRegistrationNumber,
            status: this.state.status
        });
    }

    handleOpen(){
        this.setState({ open: true });
    }

    handleClose(){
        this.setState({ open: false });
    }

    render() {
        return (
            <Modal trigger={<Button color='blue' onClick={this.handleOpen}> <Icon name='plus square'/> ADD NEW </Button>} closeOnDimmerClick={false} centered={false} open={this.state.open}>
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
                    <Button color='red' onClick={() => { this.setState({ open: false })}}> Close </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CarModal;