import React, { Component } from 'react'
import { Table, Menu, Icon } from 'semantic-ui-react';
import { getRents } from '../actions/carActions';
import store from '../stores/CarStore';
import Countdown from './Countdown';
import moment from 'moment';
import { Link, NavLink, withRouter } from 'react-router-dom';

class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rents: [],
            size: 0,
            updateRequired: false
        }
        this.updateRentsList = this.updateRentsList.bind(this);
    }

    componentDidMount() {
        store.addListener('storeUpdated', this.updateRentsList);
        getRents(this.props.match.params.id);
    }

    componentWillUnmount() {
        store.removeListener('storeUpdated', this.updateRentsList);
    }

    updateRentsList() {
        this.setState({ rents: store.getRents().rents, size: store.getRents().size });
    }

    componentDidUpdate(){
        if(this.state.updateRequired){
            getRents(this.props.match.params.id);
            this.setState({ updateRequired: false });
        }
    }

    createPages(){
        const pageCount = Math.ceil(this.state.size / 10);
        let menuItems = [];

        for(let i = 0; i < pageCount; i++)
            menuItems.push( <Menu.Item as={NavLink} to={'/reports/' + (i + 1)} key={i} 
                                onClick={() => this.setState({ updateRequired: true })}> { i + 1 } 
                            </Menu.Item>);

        return menuItems;
    }

    render() {
        return (
            <Table unstackable selectable singleLine compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell> Car </Table.HeaderCell>
                        <Table.HeaderCell> Income </Table.HeaderCell>
                        <Table.HeaderCell> Start Date </Table.HeaderCell>
                        <Table.HeaderCell> End Date </Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>Time left</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.rents.map((rent, index) =>
                        <Table.Row key={index}>
                            <Table.Cell> <Link to={'/car/' + rent.carId}> {rent.regNumber} </Link> </Table.Cell>
                            <Table.Cell> { } </Table.Cell>
                            <Table.Cell> {moment(rent.startDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell> {moment(rent.endDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell textAlign='right'>
                                <Countdown startDate={rent.startDate} endDate={rent.endDate} />
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                            <Menu floated pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                    { this.createPages() }
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

export default withRouter(Reports);