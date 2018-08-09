import React, { Component } from 'react';
import { Modal, Button, Divider, Grid, Form } from 'semantic-ui-react';
import store from '../stores/CarStore';
import { closeInfoModal, updateRent } from '../actions/carActions';
import moment from 'moment';
import { toast } from 'react-toastify';

const InfoLabel = (props) => (
    <label style={{ width: 70 }}>
        {props.content}
    </label>
);

const depositOptions = [
    {
        text: 'Yes',
        value: true
    },
    {
        text: 'No',
        value: false
    }
];

class RentInfoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            editing: true,
            rent: {
                name: '',
                surname: '',
                odometer: '',
                value: '',
                phone: '',
                deposit: ''
            }
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleDepositChange = this.handleDepositChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleModal() {
        this.setState({
            open: store.getInfoModalState().open,
            rent: store.getInfoModalState().data
        });
    }

    componentDidMount() {
        store.addListener('stateChanged', this.toggleModal);
    }

    componentWillUnmount() {
        store.removeListener('stateChanged', this.toggleModal);
    }

    handleDepositChange(event, data) {

        const depositTaken = data.value;

        this.setState(prevState => ({
            rent: {
                ...prevState.rent,
                deposit: depositTaken
            }
        }));
    }

    handleChange(event, data) {

        const value = event.target.value;
        const name = event.target.name;

        this.setState(prevState => ({
            rent: {
                ...prevState.rent,
                [name]: value
            }
        }));
    }

    handleSubmit() {
        updateRent(this.state.rent);
        toast.success("Info updated");
    }

    render() {
        return (
            <Modal size='small' open={this.state.open} closeOnDimmerClick onClose={() => closeInfoModal()}>
                <Modal.Header>
                    RENT INFO
                </Modal.Header>
                <Modal.Content>
                    <Grid columns='3'>
                        <Grid.Column>
                            <p> Rent start {moment(this.state.rent.startDate).format('YYYY/MM/DD HH:mm')}    </p>
                        </Grid.Column>

                        <Grid.Column>
                            <p> Rent end {moment(this.state.rent.endDate).format('YYYY/MM/DD HH:mm')}        </p>
                        </Grid.Column>

                        <Grid.Column>
                            <p> Added {moment(this.state.rent.addedAt).format('YYYY/MM/DD HH:mm')}           </p>
                        </Grid.Column>
                    </Grid>

                    <Grid columns='2'>
                        <Grid.Column>
                            <Form widths='equal'>
                                <Form.Input inline name='name' label={<InfoLabel content='First name' />} readOnly={!this.state.editing} value={this.state.rent.name} onChange={this.handleChange} />
                                <Form.Input inline name='surname' label={<InfoLabel content='Last name' />} readOnly={!this.state.editing} value={this.state.rent.surname} onChange={this.handleChange} />
                                <Form.Input inline name='odometer' label={<InfoLabel content='Kilometers' />} readOnly={!this.state.editing} value={this.state.rent.odometer} onChange={this.handleChange} />
                            </Form>
                        </Grid.Column>

                        <Grid.Column>
                            <Form>
                                <Form.Input inline name='phone' label={<InfoLabel content='Phone' />} readOnly={!this.state.editing} value={this.state.rent.phone} onChange={this.handleChange} />
                                <Form.Input inline name='value' label={<InfoLabel content='Income' />} readOnly={!this.state.editing} value={this.state.rent.value} onChange={this.handleChange} />
                                <Form.Dropdown inline selection options={depositOptions} compact defaultValue={this.state.rent.deposit} onChange={this.handleDepositChange} label={<InfoLabel content='Deposit' />} />
                            </Form>
                        </Grid.Column>
                    </Grid>

                    <Divider />

                    <Button color='green' content="Save changes" onClick={this.handleSubmit}/>
                    <Button color='red' content='Close' onClick={() => closeInfoModal()} />
                </Modal.Content>
            </Modal>
        )
    }
}

export default RentInfoModal;