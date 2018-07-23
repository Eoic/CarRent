import React, { Component } from 'react'
import { Table } from 'semantic-ui-react';
import { getRents } from '../actions/carActions';
import store from '../stores/CarStore';
//import { Link } from 'react-router-dom';
import Countdown from './Countdown';

class Rents extends Component {

    constructor() {
        super();
        this.state = {
            rents: []
        }
        this.updateRentsList = this.updateRentsList.bind(this);
    }

    componentDidMount() {
        store.addListener('storeUpdated', this.updateRentsList);
        getRents();
    }

    componentWillUnmount() {
        store.removeListener('storeUpdated', this.updateRentsList);
    }

    updateRentsList() {
        this.setState({ rents: store.getRents() });
    }

    render() {
        return (
            <Table unstackable selectable singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Car</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>Time left</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.rents.map((rent, index) =>
                        <Table.Row key={index}>
                            <Table.Cell></Table.Cell>
                            <Table.Cell> </Table.Cell>
                            <Table.Cell textAlign='right'> 
                                <Countdown startDate={rent.startDate} endDate={rent.endDate} /> 
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        );
    }
}

export default Rents;