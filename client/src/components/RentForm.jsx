import React, { Component } from 'react';
import { Form, Grid, Divider, Button, Icon, Header, Segment } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import '../App.css';
import { addRent } from '../actions/rentActions';
import { toast } from 'react-toastify';

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
        fontWeight: 'bold'
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

        this.state = {
            startDate: moment(),
            endDate: moment(),
            duration: 0,
            firstName: '',
            lastName: '',
            address: '',
            deposit: false,
            phone: '',
            price: '',
            odometer: 0,
            payment: {
                value: paymentOptions[0].value,
                text: paymentOptions[0].text
            }
        }

        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getDuration = this.getDuration.bind(this);
        this.handlePaymentChange = this.handlePaymentChange.bind(this);
        this.validateFields = this.validateFields.bind(this);
    }

    handleStartDateChange(date) {
        this.setState({ startDate: date }, () => this.getDuration());
    }

    handleEndDateChange(date) {
        this.setState({ endDate: date }, () => this.getDuration());
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

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
                address: this.state.address
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

        if (this.state.price.trim() === '')
            errors.push("Price field is empty");

        if (errors.length > 0) {
            errors.map(err => toast.error(err));
            return false;
        }

        toast.success("Successfully rented");
        return true;
    }

    handlePaymentChange(event, data) {
        this.setState({
            payment: {
                value: data.value,
                text: data.options[data.value].text
            }
        });
    }

    // Get duration between start and end dates.
    getDuration() {
        const { startDate, endDate } = this.state;

        const utc_one = Date.UTC(startDate.get('y'),
            startDate.get('month'),
            startDate.get('D'),
            startDate.get('hour'),
            startDate.get('minute'));

        const utc_two = Date.UTC(endDate.get('y'),
            endDate.get('month'),
            endDate.get('D'),
            endDate.get('hour'),
            endDate.get('minute'));

        const duration = Math.floor((utc_two - utc_one) / 60000);
        this.setState({ duration });
    }

    render() {
        return (
            <Grid padded columns='1' centered>
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
                </Grid>

                <Grid.Row>
                    <Grid.Column style={styles.formColumn}>
                        <Form onSubmit={this.handleSubmit} autoComplete='off'>
                            <Form.Group widths='equal'>
                                <Form.Input required name='firstName' label='First Name' onChange={this.handleChange} />
                                <Form.Input required name='lastName' label='Last Name' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input onChange={this.handleChange} name='phone' label='Phone Number' />
                                <Form.Dropdown selection options={paymentOptions} defaultValue={paymentOptions[0].value} onChange={this.handlePaymentChange} label='Payment Type' />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input onChange={this.handleChange} name='address' label='Address' />
                            </Form.Group>
                            <Form.Group widths='4'>
                                <Form.Input required label='Price' icon='euro' name='price' onChange={this.handleChange} />
                                <Form.Input label='Kilometers' name='odometer' onChange={this.handleChange} />
                                <Segment>
                                    <Form.Checkbox onChange={(e, data) => this.setState({ deposit: data.checked })} toggle label='Deposit' />
                                </Segment>
                            </Form.Group>

                            <Divider />

                            <Header>
                                <Icon name='time' size='huge' />
                                    {Math.floor((this.state.duration / 60) / 24)} days {Math.floor((this.state.duration / 60) % 24)} h. {this.state.duration % 60} min.
                                </Header>
                            <Divider />

                            <Button color='green'>
                                <Icon name='payment' />
                                Rent
                            </Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>                
            </Grid>
        );
    }
}

export default RentForm;