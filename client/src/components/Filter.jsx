import React, { Component } from 'react';
import { Form, Segment, Grid, Divider, Table, Icon, Tab } from 'semantic-ui-react';
import { filterResults } from '../actions/rentActions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../date-picker.css'

const Label = (props) => (
    <label style={{ width: 170 }}> {props.text} </label>
);

const styles = {
    dateInput: {
        marginTop: 4,
        marginBottom: 14
    },
    dateLabel: {
        fontWeight: 700,
        textTransform: 'none',
        fontSize: '.92857143em',
        color: 'rgba(0, 0, 0, .87)'
    }
}

class CustomDatePicker extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <DatePicker
                customInput={<input style={styles.dateInput} />}
                className='input-style'
                showTimeSelect
                timeFormat="HH:mm"
                locale='lt'
                timeIntervals={30}
                dateFormat="YYYY/MM/DD HH:mm"
                timeCaption="time"
                selected={this.props.value}
                onChange={(date) => this.props.onChange({
                    target: {
                        name: this.props.name,
                        value: date
                    }
                })}
            />
        )
    }
}

class Filter extends Component {

    constructor() {
        super();
        this.state = {
            filterOpen: false,
            filter: {
                startDate: null,
                endDate: null,
                dateAddedFrom: null,
                dateAddedTo: null,
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
                income: '',
                deposit: ''
            }
        }

        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    toggleFilter() {
        this.setState({
            filterOpen: !this.state.filterOpen
        });
    }

    handleChange(event) {

        let name = event.target.name;
        let value = event.target.value;

        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [name]: value
            }
        }));
    }

    handleSubmit() {
        filterResults(this.state.filter);
    }

    handleDateChange(key, date) {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [key]: date
            }
        }))
    }

    render() {
        return (
            <React.Fragment>
                <Segment.Group>
                    <Segment>
                        <Form onSubmit={this.handleSubmit}>
                            <Grid stackable columns={4} padded>
                                <Grid.Column>
                                    <label style={styles.dateLabel}> Start date </label>
                                    <CustomDatePicker style={styles.dateLabel} value={this.state.filter.startDate} onChange={this.handleChange} name='startDate' />

                                    <label style={styles.dateLabel}> End date </label>
                                    <CustomDatePicker style={styles.dateLabel} value={this.state.filter.endDate} onChange={this.handleChange} name='endDate' />

                                    <label style={styles.dateLabel}> Added from </label>
                                    <CustomDatePicker style={styles.dateLabel} value={this.state.filter.dateAddedFrom} onChange={this.handleChange} name='dateAddedFrom' />
                                </Grid.Column>

                                <Grid.Column>
                                    <Form.Input name='firstName' label={<Label text='First Name' />} onChange={this.handleChange} />
                                    <Form.Input name='lastName' label={<Label text='Last Name' />} onChange={this.handleChange} />

                                    <label style={styles.dateLabel}> Added to </label>
                                    <CustomDatePicker style={styles.dateLabel} value={this.state.filter.dateAddedTo} onChange={this.handleChange} name='dateAddedTo' />
                                </Grid.Column>

                                <Grid.Column>
                                    <Form.Input name='phone' label={<Label text='Phone' />} onChange={this.handleChange} />
                                    <Form.Input name='address' label={<Label text='Address' />} onChange={this.handleChange} />
                                </Grid.Column>

                                <Grid.Column>
                                    <Form.Input name='income' label={<Label text='Income' />} onChange={this.handleChange} />
                                    <Form.Input label={<Label text='Deposit' />} />
                                </Grid.Column>
                            </Grid>
                            <Divider />

                            <Form.Button icon labelPosition='left' color='green'>
                                <Icon name='search' />
                                Apply
                            </Form.Button>
                        </Form>
                    </Segment>
                </Segment.Group>

                <Table unstackable selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> Car </Table.HeaderCell>
                            <Table.HeaderCell> Income, &euro; </Table.HeaderCell>
                            <Table.HeaderCell> Start Date </Table.HeaderCell>
                            <Table.HeaderCell> End Date </Table.HeaderCell>
                            <Table.HeaderCell> Added </Table.HeaderCell>
                            <Table.HeaderCell textAlign='right' />
                            <Table.HeaderCell textAlign='right' />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell> Body </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='7'>
                                Footer
                        </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </React.Fragment>
        );
    }
}

export default Filter;