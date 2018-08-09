import React, { Component } from 'react';
import { Table, Menu, Icon, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
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
            reservedRents: [],
            size: 0
        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(pageNumber) {
        axios.get('/api/rents/reserved', {
            params: { page: pageNumber }
        }).then(response => {

            console.log(response.data);

            this.setState({
                reservedRents: response.data.reservedRents,
                size: response.data.size
            });
        });
    }

    createPages() {
        const pageCount = Math.ceil(this.state.size / 20);
        let menuItems = [];

        for (let i = 0; i < pageCount; i++) {
            menuItems.push(<Menu.Item as={NavLink} to={`/reports/${this.props.page.active}/${(i + 1)}/${this.props.page.ended}`} key={i}
                onClick={() => this.fetchData(i + 1)}> {i + 1}
            </Menu.Item>);
        }

        return menuItems;
    }

    componentDidMount() {
        this.fetchData(this.props.page.reserved);
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