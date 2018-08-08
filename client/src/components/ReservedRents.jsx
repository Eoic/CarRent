import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const style = {
    typeHeader: {
        backgroundColor: '#493ab5', //#bf360c
        color: '#FFFFFF',
        fontSize: '120%'
    }
}

class ReservedRents extends Component {

    constructor() {
        super();
        this.state = {
            reservedRents: []
        }
    }

    componentDidMount() {
        axios.get('/api/rents/reserved').then(response => {
            this.setState({ reservedRents: response.data });
        });
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
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.reservedRents.map((rent, index) =>
                        <Table.Row key={index}>
                            <Table.Cell> <Link to={'/car/' + rent.carId}> {rent.regNumber} </Link> </Table.Cell>
                            <Table.Cell> {rent.value} </Table.Cell>
                            <Table.Cell> {moment(rent.startDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell> {moment(rent.endDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        );
    }
}

export default ReservedRents;