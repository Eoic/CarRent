import React, { Component } from 'react';
import { Table, Menu, Icon, Button, Dropdown } from 'semantic-ui-react';
import Countdown from './Countdown';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom'

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
            showPrintWindow: false
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

    createPages() {
        const pageCount = Math.ceil(this.state.size / 20);
        let menuItems = [];

        for (let i = 0; i < pageCount; i++)
            menuItems.push(<Menu.Item as={NavLink} to={'/reports/' + (i + 1) + `/${this.props.page.reserved}/${this.props.page.ended}`} key={i}
                onClick={() => getRents(RENT_ACTIONS.GET_ACTIVE_RENTS, '', i + 1)}> {i + 1}
            </Menu.Item>);

        return menuItems;
    }

    render() {
        return (
            <div>
            <Table unstackable selectable singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='7' style={style.typeHeader}>
                            Active 
                    </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell> Car </Table.HeaderCell>
                        <Table.HeaderCell> Income, &euro; </Table.HeaderCell>
                        <Table.HeaderCell> Start Date </Table.HeaderCell>
                        <Table.HeaderCell> End Date </Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>Time left</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'> </Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'> </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.rents.map((rent, index) =>
                        <Table.Row key={index}>
                            <Table.Cell> <Link to={'/car/' + rent.carId}> {rent.regNumber} </Link> </Table.Cell>
                            <Table.Cell> {rent.value} </Table.Cell>
                            <Table.Cell> {moment(rent.startDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell> {moment(rent.endDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell textAlign='right'>
                                <Countdown startDate={rent.startDate} endDate={rent.endDate} />
                            </Table.Cell>

                            <Table.Cell>
                                <Dropdown icon='ellipsis horizontal'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => printContract(rent._id)}> 
                                            <Icon name='credit card' /> 
                                            Print Contract  
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => printInvoice(rent._id)}> 
                                            <Icon name='print'/>    
                                            Print Invoice   
                                        </Dropdown.Item>
                                        <Dropdown.Divider/>
                                        <Dropdown.Item onClick={() => endRent(rent._id)}> 
                                            <Icon name='cancel'/>
                                            End 
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => deleteRent(RENT_ACTIONS.DELETE_ACTIVE_RENT, rent._id)} style={{ color: 'red' }}> 
                                            <Icon name='trash'/>
                                            Delete 
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Table.Cell>

                            <Table.Cell textAlign='right'>
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

            </div>
        );
    }
}

export default ActiveRents;

