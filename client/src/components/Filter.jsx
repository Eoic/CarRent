import React, { Component } from 'react';
import { Form, Segment, Grid, Divider, Table, Icon, Button, Pagination, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { filterCache, paymentOptions, depositOptions } from '../stores/FilterCache';
import '../date-picker.css'
import CarSelection from './CarSelection';

const tableSize = 15;

const tableSizeOptions = [
    { key: 1, text: '10', value: 10 },
    { key: 2, text: '20', value: 20 },
    { key: 3, text: '50', value: 50 },
    { key: 4, text: '100', value: 100 },
  ]

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
                placeholderText={this.props.placeholder}
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
        const filterOptions = filterCache.getFilterOptions();
        this.state = {
            filteredEntries: filterCache.getFilteredEntries(),
            filter: filterCache.getFilterParameters(),
            filterEntriesCount: 0,
            columnFilterOpen: false,
            loadingResults: false,
            carSelectionOpen: false,
            selectedRentId: '',
            currentPage: filterOptions.currentPage,
            totalPages: filterOptions.totalPages
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.filterRents = this.filterRents.bind(this);
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

    handleDropdownChange(_, data) {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [data.name]: data.value
            }
        }));
    }

    // On button click, submit new filter and start showing results from page 1.
    handleSubmit() {
        this.setState({ loadingResults: true });

        axios.post('/api/rents/filter', this.state.filter, {
            params: { page: 1, tableSize }
        }).then(response => {
            this.setState({ filteredEntries: response.data.rents, loadingResults: false, currentPage: 1, totalPages: Math.ceil(response.data.size / tableSize) });
        });
    }

    // On page button click, submit same filter and show results, according to page number.
    filterRents(_event, data) {
        axios.post('/api/rents/filter', this.state.filter, {
            params: { page: data.activePage, tableSize }
        }).then(response => {
            this.setState({ filteredEntries: response.data.rents, loadingResults: false, currentPage: data.activePage, totalPages: Math.ceil(response.data.size / tableSize) });
        });
    }

    handleDateChange(key, date) {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [key]: date
            }
        }));
    }

    componentWillUnmount() {
        //filterCache.setFilterParameters(this.state.filter);
        filterCache.setFilteredEntries(this.state.filteredEntries);
        filterCache.setFilterOptions(this.state.currentPage, this.state.totalPages)
    }

    render() {
        return (
            <React.Fragment>
                <CarSelection open={this.state.carSelectionOpen} rentId={this.state.selectedRentId} handleClose={() => this.setState({ carSelectionOpen: false })} />
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
                                    <Form.Dropdown selection options={paymentOptions} defaultValue={paymentOptions[0].value} label='Payment Type' name='paymentType' onChange={this.handleDropdownChange} />
                                </Grid.Column>

                                <Grid.Column>
                                    <Form.Input name='income' label={<Label text='Income' />} onChange={this.handleChange} disabled />
                                    <Form.Dropdown selection options={depositOptions} defaultValue={depositOptions[0].value} label='Deposit' name='deposit' onChange={this.handleDropdownChange} />
                                </Grid.Column>
                            </Grid>
                            <Divider />

                            <Form.Group>
                                <Form.Button icon labelPosition='left' color='green' type='submit' loading={this.state.loadingResults}>
                                    <Icon name='search' />
                                    Apply
                                </Form.Button>
                            </Form.Group>
                        </Form>
                    </Segment>
                </Segment.Group>
                <Table unstackable selectable compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='8'>
                                <label> Results per page </label>
                                <Dropdown labeled options={tableSizeOptions} defaultValue={tableSizeOptions[0].value} />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> Car number </Table.HeaderCell>
                            <Table.HeaderCell> Rented by </Table.HeaderCell>
                            <Table.HeaderCell> Income, &euro; </Table.HeaderCell>
                            <Table.HeaderCell> Start Date </Table.HeaderCell>
                            <Table.HeaderCell> End Date </Table.HeaderCell>
                            <Table.HeaderCell> Added </Table.HeaderCell>
                            <Table.HeaderCell textAlign='right' />
                            <Table.HeaderCell textAlign='right' />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.filteredEntries.length === 0 && !this.state.loadingResults && <Table.Row><Table.Cell colSpan='8'>No rents match search parameters</Table.Cell></Table.Row>}
                        {this.state.filteredEntries.map((rent, index) => <Table.Row key={index}>
                            <Table.Cell> <Link className='custom-link' to={'/car/' + rent.carId}> {rent.regNumber} </Link> </Table.Cell>
                            <Table.Cell> {rent.name} {rent.surname} </Table.Cell>
                            <Table.Cell> {rent.value} </Table.Cell>
                            <Table.Cell> {moment(rent.startDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell> {moment(rent.endDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell> {moment(rent.addedAt).format('YYYY/MM/DD HH:mm')} </Table.Cell>

                            <Table.Cell textAlign='right' width='1'>
                                <Button animated='vertical' color='green'>
                                    <Button.Content hidden> INFO </Button.Content>
                                    <Button.Content visible>
                                        <Icon name='question circle' />
                                    </Button.Content>
                                </Button>
                            </Table.Cell>

                            <Table.Cell textAlign='center' width='1'>
                                <Button animated='vertical' color='purple' onClick={() => this.setState({ selectedRentId: rent._id, carSelectionOpen: true })}>
                                    <Button.Content hidden> COPY </Button.Content>
                                    <Button.Content visible>
                                        <Icon name='redo alternate' />
                                    </Button.Content>
                                </Button>
                            </Table.Cell>
                        </Table.Row>)}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='8'>
                                <Pagination activePage={this.state.currentPage} totalPages={this.state.totalPages} onPageChange={this.filterRents} />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </React.Fragment>
        );
    }
}

export default Filter;