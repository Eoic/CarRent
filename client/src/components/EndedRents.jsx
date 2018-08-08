import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const style = {
    typeHeader: {
        backgroundColor: '#880e4f',
        color: '#FFFFFF',
        fontSize: '120%'
    }
}

class EndedRents extends Component {

    constructor() {
        super();
        this.state = {
            endedRents: []
        }
    }

    componentDidMount() {
        axios.get('/api/rents/ended').then(response => {
            this.setState({
                endedRents: response.data
            });
        });
    }

    render() {
        return (
            <Table unstackable selectable singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='7' style={style.typeHeader}>
                            Ended
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
                    {this.state.endedRents.map((rent, index) =>
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

export default EndedRents;