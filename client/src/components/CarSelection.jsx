import React, { Component } from 'react';
import { Dropdown, Button, Modal } from 'semantic-ui-react';
import { getCars } from '../actions/carActions';
import { getRentCopy } from '../actions/rentActions';
import carStore from '../stores/CarStore';
import rentStore from '../stores/RentStore';
import { withRouter } from 'react-router-dom';

class CarSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carsData: carStore.getCars(),
            carOptions: [],
            selectedCar: null,
            copyLoading: false
        }

        this.updateCarOptions = this.updateCarOptions.bind(this);
        this.redirectToRentForm = this.redirectToRentForm.bind(this);
    }

    componentDidMount() {
        carStore.addListener('storeUpdated', this.updateCarOptions);
        rentStore.addListener('rentCopyAvailable', this.redirectToRentForm);
        getCars();
    }

    componentWillUnmount() {
        carStore.removeListener('storeUpdated', this.updateCarOptions);
        rentStore.removeListener('rentCopyAvailable', this.redirectToRentForm);
    }

    updateCarOptions() {
        let carOptions = carStore.getCars().map((car, index) => ({
            key: index,
            value: car._id,
            text: `${car.registrationNumber} | ${car.model}`
        }));

        this.setState({ carOptions });
    }

    redirectToRentForm() {
        if (this.state.selectedCar === null) {
            this.setState({ copyLoading: false })
            return;
        }

        this.props.history.push(`/car/${this.state.selectedCar}`)
    }

    render() {
        return (
            <Modal open={this.props.open} size='small'>
                <Modal.Header> Select car to rent </Modal.Header>
                <Modal.Content>
                    <Dropdown
                        placeholder='Select Car'
                        fluid
                        search
                        selection
                        options={this.state.carOptions}
                        onChange={(_, data) => this.setState({ selectedCar: data.value })}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={() => { this.setState({ copyLoading: true }); getRentCopy(this.props.rentId) }} loading={this.state.copyLoading}> Select </Button>
                    <Button negative onClick={this.props.handleClose}> Close </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default withRouter(CarSelection);