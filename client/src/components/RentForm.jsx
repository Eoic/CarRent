import React, { Component } from 'react';
import { Form, Label, Grid, Divider } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import '../App.css';

function DateLabel(props) {
    return (<Label size='big' color='violet' pointing='right' icon='time' content={props.content} className='date-label' />);
}

const paymentOptions = [
    {
        text: 'In Cash',
        value: 2
    },
    {
        text: 'Bank Transfer',
        value: 1
    }
];

class RentForm extends Component {

    constructor() {
        super();

        this.state = {
            startDate: moment(),
            endDate: moment()
        }

        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStartDateChange(date) {
        this.setState({ startDate: date });
    }

    handleEndDateChange(date) {
        this.setState({ endDate: date });
    }

    handleSubmit(event) {

    }

    render() {
        return (
            <Grid padded columns='1' centered>
                <Grid padded style={{ paddingBottom: '10px' }}>
                    <DateLabel content='Start Date' />
                    <DatePicker
                        className='input-style'
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="LLL"
                        timeCaption="time"
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange}
                    />
                </Grid>
                <Grid padded style={{ paddingBottom: '10px' }}>
                    <DateLabel content='End Date' />
                    <DatePicker
                        className='input-style'
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                    />
                </Grid>

                { /* Other info here. */}
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: '780px' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input label='First Name' />
                                <Form.Input label='Last Name' />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input label='Phone Number' />
                                <Form.Dropdown selection options={paymentOptions} defaultValue={paymentOptions[0].value} label='Payment Type' />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Checkbox toggle label='Deposit' />
                            </Form.Group>
                        </Form>
                        <Divider />
                        <label> Duration: </label> <br />
                        <label> Rent costs:  </label>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default RentForm;