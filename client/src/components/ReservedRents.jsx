import React, { Component } from 'react';
import { Table, Menu, Icon, Button } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import moment from 'moment';

// Flux.
import store from '../stores/RentStore';
import { getRents, deleteRent, openInfoModal } from '../actions/rentActions';
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
            size: store.getReservedRents().size
        }
        this.updateRentsList = this.updateRentsList.bind(this);
        this.fetchData = this.fetchData.bind(this);
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

    createPages() {
        const pageCount = Math.ceil(this.state.size / 20);
        let menuItems = [];

        for (let i = 0; i < pageCount; i++) {
            menuItems.push( <Menu.Item as={NavLink} to={`/reports/${this.props.page.active}/${(i + 1)}/${this.props.page.ended}`} key={i}
                                onClick={() => getRents(RENT_ACTIONS.GET_RESERVED_RENTS, 'reserved', i + 1)}> {i + 1}
                            </Menu.Item>);
        }

        return menuItems;
    }

    render() {
        return (
            <Table unstackable selectable singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='7' style={style.typeHeader}>
                            Reserved
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell> Car </Table.HeaderCell>
                        <Table.HeaderCell> Income, &euro; </Table.HeaderCell>
                        <Table.HeaderCell> Start Date </Table.HeaderCell>
                        <Table.HeaderCell> End Date </Table.HeaderCell>
                        <Table.HeaderCell textAlign='right' />
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.reservedRents.map((rent, index) =>
                        <Table.Row key={index}>
                            <Table.Cell> <Link to={'/car/' + rent.carId}> {rent.regNumber} </Link> </Table.Cell>
                            <Table.Cell> {rent.value} </Table.Cell>
                            <Table.Cell> {moment(rent.startDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell> {moment(rent.endDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell textAlign='right'>
                                <Button icon='trash' color='red' onClick={() => deleteRent(RENT_ACTIONS.DELETE_RESERVED_RENT, rent._id)} />
                            </Table.Cell>
                            <Table.Cell textAlign='right'>
                                <Button animated='vertical' color='green' onClick={() => openInfoModal(RENT_ACTIONS.UPDATE_RESERVED_RENT, rent._id)} >
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
                            <Menu floated pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                {this.createPages()}
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default ReservedRents;