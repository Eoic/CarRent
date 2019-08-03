import React, { Component } from 'react';
import { Modal, Button, Divider, Grid, Form, Segment, Header, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { toast } from 'react-toastify';

// Flux.
import store from '../stores/RentStore';
import { updateRent, closeInfoModal } from '../actions/rentActions';

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
            rent: {
                name: '',
                surname: '',
                odometer: '',
                value: '',
                phone: '',
                deposit: '',
                address: '',
                notes: '',
                notesVisible: false
            },
            rentType: ''
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleDepositChange = this.handleDepositChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleNotes = this.toggleNotes.bind(this);
    }

    toggleModal() {
        this.setState({
            open: store.getInfoModalState().open,
            rent: store.getInfoModalState().data,
            rentType: store.getInfoModalState().rentType
        });
    }

    componentDidMount() {
        store.addListener('stateChanged', this.toggleModal);
    }

    componentWillUnmount() {
        store.removeListener('stateChanged', this.toggleModal);
    }

    toggleNotes() {
        this.setState({ notesVisible: !this.state.notesVisible });
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
        updateRent(this.state.rentType, this.state.rent);
        toast.success("Info updated");
    }

    render() {
        return (
            <Modal size='small' open={this.state.open} closeOnDimmerClick onClose={() => closeInfoModal()}>
                <Modal.Header as={Segment} clearing style={{ paddingBottom: 0 }}>
                    <Header as='h3' floated='left'>
                        Rent Info
                        </Header>
                    <Header as='h3' floated='right'>
                        Added {moment(this.state.rent.addedAt).format('YYYY/MM/DD HH:mm')}
                    </Header>
                </Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form widths='equal'>
                                    <Form.Input inline name='startDate' label={<InfoLabel content='Start date' />} value={moment(this.state.rent.startDate).format('YYYY/MM/DD HH:mm')} />
                                    <Form.Input inline name='name' label={<InfoLabel content='First name' />} value={this.state.rent.name} onChange={this.handleChange} />
                                    <Form.Input inline name='surname' label={<InfoLabel content='Last name' />} value={this.state.rent.surname} onChange={this.handleChange} />
                                    <Form.Input inline name='odometer' label={<InfoLabel content='Kilometers' />} value={this.state.rent.odometer} onChange={this.handleChange} />
                                    <Form.Input inline name='address' label={<InfoLabel content='Address' />} value={this.state.rent.address} onChange={this.handleChange} />
                                </Form>
                            </Grid.Column>
                            <Grid.Column>
                                <Form>
                                    <Form.Input inline name='endDate' label={<InfoLabel content='End date' />} value={moment(this.state.rent.endDate).format('YYYY/MM/DD HH:mm')} />
                                    <Form.Input inline name='phone' label={<InfoLabel content='Phone' />} value={this.state.rent.phone} onChange={this.handleChange} />
                                    <Form.Input inline name='value' label={<InfoLabel content='Income' />} value={this.state.rent.value} onChange={this.handleChange} />
                                    <Form.Dropdown inline selection options={depositOptions} compact defaultValue={this.state.rent.deposit} onChange={this.handleDepositChange} label={<InfoLabel content='Deposit' />} />
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    
                        <Grid.Row style={{ paddingTop: 0 }}>
                            <Grid.Column>
                                <Form>
                                    <Form.TextArea value={this.state.rent.notes} label={<InfoLabel content='Notes' />} onChange={this.handleChange} name='notes' style={{ maxHeight: 300, minHeight: 41 }} />
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Divider />

                    <Button color='green' icon labelPosition='left' onClick={this.handleSubmit}>
                        <Icon name='save' />
                        Save changes
                    </Button>
                    <Button color='red' icon labelPosition='left' onClick={() => { this.setState({ notesVisible: false }); closeInfoModal() }}>
                        <Icon name='close'/>
                        Close
                    </Button>
                </Modal.Content>
            </Modal>
        )
    }
}

export default RentInfoModal;