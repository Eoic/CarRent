import React, { Component } from 'react';
import { Table, Icon, Button, Dropdown, Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

// Flux.
import store from '../stores/RentStore';
import { getRents, deleteRent, openInfoModal, printContract } from '../actions/rentActions';
import { RENT_ACTIONS } from '../actions/types';

const style = {
    typeHeader: {
        backgroundColor: '#493ab5',
        color: '#FFFFFF',
        fontSize: '120%'
    }
}

class ReservedRents extends Component {

    constructor() {
        super();
        this.state = {
            reservedRents: store.getReservedRents().reservedRents,
            size: store.getReservedRents().size,
            column: null,
            direction: null
        }
        this.updateRentsList = this.updateRentsList.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    updateRentsList() {
        this.setState({
            reservedRents: store.getReservedRents().reservedRents,
            size: store.getReservedRents().size
        });
    }

    fetchData = () => getRents(RENT_ACTIONS.GET_RESERVED_RENTS, 'reserved', this.props.page.reserved);

    componentDidMount() {
        store.addListener('storeUpdate_Reserved', this.updateRentsList);
        store.addListener('update_Reserved', this.fetchData);
        getRents(RENT_ACTIONS.GET_RESERVED_RENTS, 'reserved', this.props.page.reserved);
    }

    componentWillUnmount() {
        store.removeListener('storeUpdate_Reserved', this.updateRentsList);
        store.removeListener('updateReserved', this.fetchData);
    }

    handlePageChange(_event, data) {
        if(data.activePage < 1)
            return;
        
        getRents(RENT_ACTIONS.GET_RESERVED_RENTS, 'reserved',  data.activePage)
    }

    handleSort = clickedColumn => () => {
        const { column, reservedRents, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                reservedRents: _.sortBy(reservedRents, [clickedColumn]),
                direction: 'ascending',
            });

            return;
        }

        this.setState({
            rents: reservedRents.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }

    handleDateSort = clickedColumn => () => {
        const { column, reservedRents, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                reservedRents: _.orderBy(reservedRents, (item) => {
                    return new moment(item[clickedColumn]).format('YYYY/MM/DD HH:mm')
                }, [clickedColumn]),
                direction: 'ascending',
            });

            return;
        }

        this.setState({
            reservedRents: reservedRents.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }

    render() {

        const { column, reservedRents, direction } = this.state;

        return (
            <Table stackable sortable selectable compact>
                <Table.Header>
                    <Table.Row className='y-padding-none'>
                        <Table.HeaderCell colSpan='7' style={style.typeHeader}>
                            Reserved
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell sorted={column === 'regNumber' ? direction : null} onClick={this.handleSort('regNumber')} > Car </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'value' ? direction : null} onClick={this.handleSort('value')}> Income, &euro; </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'startDate' ? direction : null} onClick={this.handleDateSort('startDate')}> Start Date </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'endDate' ? direction : null} onClick={this.handleDateSort('endDate')}>  End Date </Table.HeaderCell>
                        <Table.HeaderCell />
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {reservedRents.map((rent, index) =>
                        <Table.Row key={index}>
                            <Table.Cell> <Link to={'/car/' + rent.carId}> {rent.regNumber} </Link> </Table.Cell>
                            <Table.Cell> {rent.value} </Table.Cell>
                            <Table.Cell> {moment(rent.startDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell> {moment(rent.endDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell className='align-right-large' width='1'>
                                <Dropdown icon={<Icon style={{ margin: '2px' }} name='ellipsis horizontal' />} button>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => printContract(rent._id)}>
                                            <Icon name='credit card' />
                                            Print Contract
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => deleteRent(RENT_ACTIONS.DELETE_RESERVED_RENT, rent._id)} style={{ color: 'red' }}>
                                            <Icon name='trash' />
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Table.Cell>
                            <Table.Cell className='align-right-large' width='1'>
                                <Button animated='vertical' color='green' onClick={() => openInfoModal(RENT_ACTIONS.UPDATE_RESERVED_RENT, rent._id)} >
                                    <Button.Content hidden> INFO </Button.Content>
                                    <Button.Content visible>
                                        <Icon name='question circle' />
                                    </Button.Content>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    )}{this.state.reservedRents.length === 0 && <Table.Row><Table.Cell colSpan='6'>No reserved rents</Table.Cell></Table.Row>}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='7'>
                            <Pagination defaultActivePage={1} totalPages={Math.ceil(this.state.size / 10)} onPageChange={this.handlePageChange} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default ReservedRents;