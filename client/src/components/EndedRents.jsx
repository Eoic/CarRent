import React, { Component } from 'react';
import { Table, Icon, Button, Dropdown, Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// Flux.
import store from '../stores/RentStore';
import { getRents, openInfoModal, deleteRent } from '../actions/rentActions';
import { RENT_ACTIONS } from '../actions/types';
import BlankTable from "./BlankTable";

const style = {
    typeHeader: {
        backgroundColor: '#533b4d',
        color: '#FFFFFF',
        fontSize: '120%'
    }
}

class EndedRents extends Component {

    constructor() {
        super();
        this.state = {
            endedRents: store.getEndedRents().endedRents,
            size: store.getEndedRents().size
        };
        this.updateRentsList = this.updateRentsList.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        store.addListener('storeUpdate_Ended', this.updateRentsList);
        store.addListener('update_Ended', this.fetchData);
        getRents(RENT_ACTIONS.GET_ENDED_RENTS, 'ended', this.props.page.ended);
    }

    componentWillUnmount() {
        store.removeListener('storeUpdate_Ended', this.updateRentsList);
        store.removeListener('update_Ended', this.fetchData);
    }

    fetchData = () => getRents(RENT_ACTIONS.GET_ENDED_RENTS, 'ended', this.props.page.ended);

    updateRentsList() {
        this.setState({
            endedRents: store.getEndedRents().endedRents,
            size: store.getEndedRents().size
        });
    }

    render() {
        return (
            <Table stackable selectable compact celled singleLine>
                <Table.Header>
                    <Table.Row className='y-padding-none'>
                        <Table.HeaderCell colSpan='8' style={style.typeHeader}>
                            Ended
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={2}> Car </Table.HeaderCell>
                        <Table.HeaderCell> Income, &euro; </Table.HeaderCell>
                        <Table.HeaderCell> Start Date </Table.HeaderCell>
                        <Table.HeaderCell> End Date </Table.HeaderCell>
                        <Table.HeaderCell> Payment type </Table.HeaderCell>
                        <Table.HeaderCell> Deposit </Table.HeaderCell>
                        <Table.HeaderCell className='align-right-large' />
                        <Table.HeaderCell className='align-right-large' />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.endedRents.map((rent, index) =>
                        <Table.Row key={index}>
                            <Table.Cell> <Link to={'/car/' + rent.carId}> {rent.regNumber} </Link> </Table.Cell>
                            <Table.Cell> {rent.value} </Table.Cell>
                            <Table.Cell> {moment(rent.startDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell> {moment(rent.endDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell> {rent.paymentType || 'In Cash'}</Table.Cell>
                            <Table.Cell> {(rent.deposit) ? "Yes" : "No" } </Table.Cell>
                            <Table.Cell className='align-right-large' width={1}>
                                <Dropdown icon={<Icon style={{ margin: '2px' }} name='ellipsis horizontal' />} button>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => deleteRent(RENT_ACTIONS.DELETE_ENDED_RENT, rent._id)} style={{ color: 'red' }}>
                                            <Icon name='trash' />
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Table.Cell>
                            <Table.Cell className='align-right-large' width='1'>
                                <Button animated='vertical' color='green' onClick={() => openInfoModal(RENT_ACTIONS.UPDATE_ENDED_RENT, rent._id)} >
                                    <Button.Content hidden> INFO </Button.Content>
                                    <Button.Content visible>
                                        <Icon name='question circle' />
                                    </Button.Content>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    )}
                    {!this.state.endedRents.length && <BlankTable colSpan={8} text={'No ended rents.'} />}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='8'>
                            <Pagination defaultActivePage={1} ellipsisItem={null} totalPages={Math.ceil(this.state.size / 10)} onPageChange={(_event, data) => getRents(RENT_ACTIONS.GET_ENDED_RENTS, 'ended', data.activePage)} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default EndedRents;