import React, { Component } from 'react';
import { Table, Icon, Button, Dropdown, Pagination } from 'semantic-ui-react';
import Countdown from './Countdown';
import moment from 'moment';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// Flux.
import store from '../stores/RentStore';
import { getRents, endRent, deleteRent, openInfoModal, printInvoice, printContract } from '../actions/rentActions';
import { RENT_ACTIONS } from '../actions/types';

const style = {
    typeHeader: {
        backgroundColor: '#4caf50',
        color: '#FFFFFF',
        fontSize: '120%'
    }
}

class ActiveRents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rents: store.getActiveRents().activeRents,
            size: store.getActiveRents().size,
            showPrintWindow: false,
            column: null,
            direction: null
        }
        this.updateRentsList = this.updateRentsList.bind(this);
        this.fetchData = this.fetchData.bind(this);

        this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
        this.closeWindowPortal = this.closeWindowPortal.bind(this);
    }

    fetchData = () => getRents(RENT_ACTIONS.GET_ACTIVE_RENTS, '', this.props.page.active);

    componentDidMount() {
        store.addListener('storeUpdate_Active', this.updateRentsList);
        store.addListener('update_Active', this.fetchData);
        getRents(RENT_ACTIONS.GET_ACTIVE_RENTS, '', this.props.page.active);
    }

    componentWillUnmount() {
        store.removeListener('storeUpdate_Active', this.updateRentsList);
        store.removeListener('update_Active', this.fetchData);
    }

    toggleWindowPortal() {
        this.setState({ showPrintWindow: true });
    }

    closeWindowPortal() {
        this.setState({ showPrintWindow: false })
    }

    updateRentsList() {
        this.setState({
            rents: store.getActiveRents().activeRents,
            size: store.getActiveRents().size
        });
    }

    handleSort = clickedColumn => () => {
        const { column, rents, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                rents: _.sortBy(rents, [clickedColumn]),
                direction: 'ascending',
            });

            return;
        }

        this.setState({
            rents: rents.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }

    handleDateSort = clickedColumn => () => {
        const { column, rents, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                rents: _.orderBy(rents, (item) => {
                    return new moment(item[clickedColumn]).format('YYYY/MM/DD HH:mm')
                }, [clickedColumn]),
                direction: 'ascending',
            });

            return;
        }

        this.setState({
            rents: rents.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }

    render() {

        const { column, rents, direction } = this.state;

        return (
            <div>
                <Table stackable sortable selectable compact>
                    <Table.Header>
                        <Table.Row className='y-padding-none'>
                            <Table.HeaderCell colSpan='7' style={style.typeHeader}>
                                <i className='fa fa-hourglass-half' />
                                Active </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sorted={column === 'regNumber' ? direction : null} onClick={this.handleSort('regNumber')}> Car </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'value' ? direction : null} onClick={this.handleSort('value')} > Income, &euro; </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'startDate' ? direction : null} onClick={this.handleDateSort('startDate')}> Start Date </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'endDate' ? direction : null} onClick={this.handleDateSort('endDate')}> End Date </Table.HeaderCell>
                            <Table.HeaderCell className='align-right-large'> Time left </Table.HeaderCell>
                            <Table.HeaderCell textAlign='right' />
                            <Table.HeaderCell textAlign='right' />
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {rents.map((rent, index) =>
                            <Table.Row key={index}>
                                <Table.Cell> <Link to={'/car/' + rent.carId}> {rent.regNumber} </Link> </Table.Cell>
                                <Table.Cell> {rent.value} </Table.Cell>
                                <Table.Cell> {moment(rent.startDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                                <Table.Cell> {moment(rent.endDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                                <Table.Cell className='align-right-large'>
                                    <Countdown startDate={rent.startDate} endDate={rent.endDate} />
                                </Table.Cell>

                                <Table.Cell className='align-right-large' width='1'>
                                    <Dropdown icon={<Icon style={{ margin: '2px' }} name='ellipsis horizontal' />} button>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => printContract(rent._id)}>
                                                <Icon name='credit card' />
                                                Print Contract
                                        </Dropdown.Item>
                                            <Dropdown.Item onClick={() => printInvoice(rent._id)}>
                                                <Icon name='print' />
                                                Print Invoice
                                        </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={() => endRent(rent._id)}>
                                                <Icon name='cancel' />
                                                End
                                        </Dropdown.Item>
                                            <Dropdown.Item onClick={() => deleteRent(RENT_ACTIONS.DELETE_ACTIVE_RENT, rent._id)} style={{ color: 'red' }}>
                                                <Icon name='trash' />
                                                Delete
                                        </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Table.Cell>

                                <Table.Cell className='align-right-large' width='1'>
                                    <Button animated='vertical' color='green' onClick={() => openInfoModal(RENT_ACTIONS.UPDATE_ACTIVE_RENT, rent._id)}>
                                        <Button.Content hidden> INFO </Button.Content>
                                        <Button.Content visible>
                                            <Icon name='question circle' />
                                        </Button.Content>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='7'>
                                <Pagination defaultActivePage={1} totalPages={Math.ceil(this.state.size / 10)} onPageChange={(_event, data) => getRents(RENT_ACTIONS.GET_ACTIVE_RENTS, '', data.activePage)} />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>

            </div>
        );
    }
}

export default ActiveRents;