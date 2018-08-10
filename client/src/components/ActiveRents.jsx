import React, { Component } from 'react';
import { Table, Menu, Icon, Button, Dropdown } from 'semantic-ui-react';
import { getRents, endRent, deleteRent } from '../actions/carActions';
import store from '../stores/CarStore';
import Countdown from './Countdown';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import { openInfoModal } from '../actions/carActions';

const style = {
    typeHeader: {
        backgroundColor: '#3ab522',
        color: '#FFFFFF',
        fontSize: '120%'
    }
}

class ActiveRents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rents: [],
            size: 0
        }
        this.updateRentsList = this.updateRentsList.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    cancelRent = id => {
        endRent(id);
    }

    deleteRent = id => {
        deleteRent(id);
    }

    fetchData() {
        getRents(this.props.page.active);
    }

    componentDidMount() {
        store.addListener('storeUpdated', this.updateRentsList);
        store.addListener('updateEvent', this.fetchData);
        getRents(this.props.page.active);
    }

    componentWillUnmount() {
        store.removeListener('storeUpdated', this.updateRentsList);
        store.removeListener('updateEvent', this.fetchData);
    }

    updateRentsList() {
        this.setState({ 
            rents: store.getRents().rents, 
            size: store.getRents().size 
        });
    }

    createPages() {
        const pageCount = Math.ceil(this.state.size / 20);
        let menuItems = [];

        for (let i = 0; i < pageCount; i++)
            menuItems.push(<Menu.Item as={NavLink} to={'/reports/' + (i + 1) + `/${this.props.page.reserved}/${this.props.page.ended}`} key={i}
                onClick={() => this.setState({ updateRequired: true })}> {i + 1}
            </Menu.Item>);

        return menuItems;
    }

    render() {
        return (
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
                                        <Dropdown.Item onClick={this.cancelRent.bind(this, rent._id)}> Cancel </Dropdown.Item>
                                        <Dropdown.Item onClick={this.deleteRent.bind(this, rent._id)} style={{ color: 'red' }}> Delete </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Table.Cell>

                            <Table.Cell textAlign='right'>
                                <Button animated='vertical' color='green' onClick={() => openInfoModal(rent._id)}>
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

export default ActiveRents;

