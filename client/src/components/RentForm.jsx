import React, { Component } from 'react';
import { Form, Grid, Divider, Button, Icon, Header, FormGroup } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import '../App.css';
import { addRent } from '../actions/rentActions';
import { toast } from 'react-toastify';
import rentStore from '../stores/RentStore'
import RentSummary from './RentSummary';
import { dateFormatter } from '../utils/dateFormatter';

const paymentOptions = [
    {
        text: 'In Cash',
        value: 0
    },
    {
        text: 'Bank Transfer',
        value: 1
    }
];

const styles = {
    label: {
        paddingTop: '7px',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100px'
    },
    innerGrid: {
        paddingBottom: '10px'
    },
    formColumn: {
        maxWidth: '780px'
    }
}

class RentForm extends Component {

    constructor() {
        super();

        var rentCopy = rentStore.getRentCopy();

        var initialState = {
            startDate: moment(rentCopy.startDate) || moment(),
            endDate: moment(rentCopy.endDate) || moment(),
            duration: 0,
            firstName: rentCopy.name || '',
            lastName: rentCopy.surname || '',
            address: rentCopy.address || '',
            deposit: rentCopy.deposit || false,
            phone: rentCopy.phone || '',
            price: rentCopy.value || '',
            notes: rentCopy.notes || '',
            odometer: rentCopy.odometer || 0,
            payment: rentCopy.paymentType || {
                value: paymentOptions[0].value,
                text: paymentOptions[0].text
            },
            rentAdded: false,
            rentAddPending: false,
            processedRentData: {}
        }

        initialState.duration = dateFormatter.getDuration(initialState.startDate, initialState.endDate);

        this.state = initialState;
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePaymentChange = this.handlePaymentChange.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.handleRentSuccess = this.handleRentSuccess.bind(this)
        this.handleFormReset = this.handleFormReset.bind(this)

        if (!(Object.keys(rentCopy).length === 0 && rentCopy.constructor === Object))
            rentStore.flushRentCopy();
    }

    handleFormReset() {
        this.setState({ rentAdded: false })
    }

    handleRentSuccess(message) {
        this.setState({ rentAddPending: false, rentAdded: true, processedRentData: rentStore.getRent() })
    }

    componentDidMount() {
        rentStore.on('rentAdded', this.handleRentSuccess)
    }

    componentWillUnmount() {
        rentStore.removeListener('rentAdded', this.handleRentSuccess)
    }

    handleStartDateChange(date) {
        this.setState({ startDate: date }, () => {
            this.setState({ duration: dateFormatter.getDuration(this.state.startDate, this.state.endDate) })
        });
    }

    handleEndDateChange(date) {
        this.setState({ endDate: date }, () => {
            this.setState({ duration: dateFormatter.getDuration(this.state.startDate, this.state.endDate) })
        });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ rentAddPending: true })

        if (this.validateFields()) {

            const newRent = {
                carId: this.props.carId,
                startDate: moment(this.state.startDate, 'YYYY-MM-DDTHH:MM:SSZ').toDate(),
                endDate: moment(this.state.endDate, 'YYYY-MM-DDTHH:MM:SSZ').toDate(),
                price: this.state.price,
                name: this.state.firstName,
                surname: this.state.lastName,
                phone: this.state.phone,
                deposit: this.state.deposit,
                odometer: this.state.odometer,
                address: this.state.address,
                notes: this.state.notes,
                paymentType: this.state.payment.text
            }

            addRent(newRent);
        }
    }

    validateFields() {

        let errors = [];

        if (this.state.firstName.trim() === '' || this.state.lastName.trim() === '')
            errors.push("Client name is empty.");

        if (this.state.startDate.isSameOrAfter(this.state.endDate) || this.state.duration === 0)
            errors.push("Selected rent date is incorrect.");
        /*
        if (this.state.price.trim() === '')
            errors.push("Price field is empty");
        */

        if (errors.length > 0) {
            errors.map(err => toast.error(err));
            return false;
        }

        return true;
    }

    handlePaymentChange(_event, data) {
        this.setState({
            payment: {
                value: data.value,
                text: data.options[data.value].text
            }
        })
    }

    render() {
        return (
            <Grid padded columns='1' centered>
                {this.state.rentAdded ? <RentSummary data={this.state.processedRentData} resetForm={this.handleFormReset} duration={dateFormatter.getLongDurationString(this.state.duration)} /> :
                    <React.Fragment>
                        {/*
                        <Grid padded style={styles.innerGrid}>
                            <label style={styles.label}> Start Date </label>
                            <DatePicker
                                className='input-style'
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="YYYY/MM/DD HH:mm"
                                timeCaption="time"
                                locale='lt'
                                selected={this.state.startDate}
                                onChange={this.handleStartDateChange}
                                disabled={this.state.isRented}
                            />
                        </Grid>
                        <Grid padded style={styles.innerGrid}>
                            <label style={styles.label}> End Date </label>
                            <DatePicker
                                className='input-style'
                                showTimeSelect
                                timeFormat="HH:mm"
                                locale='lt'
                                timeIntervals={30}
                                dateFormat="YYYY/MM/DD HH:mm"
                                timeCaption="time"
                                selected={this.state.endDate}
                                onChange={this.handleEndDateChange}
                                disabled={this.state.isRented}
                            />
                        </Grid> */}
                        <Grid.Row>
                            <Grid.Column style={styles.formColumn}>
                                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                                    <Form.Group widths='equal'>
                                        <Form.Input label='Start date'>
                                            <DatePicker
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={30}
                                                dateFormat="YYYY/MM/DD HH:mm"
                                                timeCaption="time"
                                                locale='lt'
                                                selected={this.state.startDate}
                                                onChange={this.handleStartDateChange}
                                                disabled={this.state.isRented}
                                            />
                                        </Form.Input>
                                        <Form.Input label='End date'>
                                            <DatePicker
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                locale='lt'
                                                timeIntervals={30}
                                                dateFormat="YYYY/MM/DD HH:mm"
                                                timeCaption="time"
                                                selected={this.state.endDate}
                                                onChange={this.handleEndDateChange}
                                                disabled={this.state.isRented}
                                            />
                                        </Form.Input>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input required name='firstName' label='First Name' onChange={this.handleChange} value={this.state.firstName} />
                                        <Form.Input required name='lastName' label='Last Name' onChange={this.handleChange} value={this.state.lastName} />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input onChange={this.handleChange} name='phone' label='Phone Number' value={this.state.phone} />
                                        <Form.Dropdown selection options={paymentOptions} defaultValue={paymentOptions[0].value} onChange={this.handlePaymentChange} label='Payment Type' />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input onChange={this.handleChange} name='address' label='Address' value={this.state.address} />
                                    </Form.Group>
                                    <Form.Group widths='4'>
                                        <Form.Input required label='Price' icon='euro' type='number' min='0' name='price' onChange={this.handleChange} value={this.state.price} />
                                        <Form.Input label='Kilometers' name='odometer' onChange={this.handleChange} value={this.state.odometer} />
                                        <div className='field'>
                                            <label style={{ marginBottom: 12 }}> Deposit </label>
                                            <Form.Checkbox checked={this.state.deposit} onChange={(_e, data) => this.setState({ deposit: data.checked })} toggle />
                                        </div>
                                    </Form.Group>
                                    <FormGroup widths='equal'>
                                        <Form.TextArea name='notes' style={{ maxHeight: '500px' }} value={this.state.notes} onChange={this.handleChange} label='Notes'></Form.TextArea>
                                    </FormGroup>

                                    <Divider />

                                    <Header>
                                        <Icon name='time' size='huge' />
                                        {`${dateFormatter.getLongDurationString(this.state.duration)}`}
                                    </Header>
                                    <Divider />
                                    <Button icon labelPosition='left' color='green' loading={this.state.rentAddPending}>
                                        <Icon name='payment' />
                                        Rent
                                    </Button>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </React.Fragment>}
            </Grid>
        );
    }
}

export default RentForm;
