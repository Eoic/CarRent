import React, { Component } from 'react';
import { Table, Menu, Icon, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { openInfoModal } from '../actions/carActions';
import moment from 'moment';

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
            endedRents: [],
            size: 0
        }
        this.fetchData = this.fetchData.bind(this);
    }

    createPages() {
        const pageCount = Math.ceil(this.state.size / 10);
        let menuItems = [];

        for (let i = 0; i < pageCount; i++) {
            menuItems.push(<Menu.Item as={NavLink} to={`/reports/${this.props.page.active}/${this.props.page.reserved}/${(i + 1)}`} key={i}
                onClick={() => this.fetchData(i + 1)}> {i + 1}
            </Menu.Item>);
        }

        return menuItems;
    }

    componentDidMount() {
        this.fetchData(this.props.page.ended);
    }

    fetchData(pageNumber) {
        axios.get('/api/rents/ended', {
            params: { page: pageNumber }
        }).then(response => {
            this.setState({
                endedRents: response.data.endedRents,
                size: response.data.size
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
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.endedRents.map((rent, index) =>
                        <Table.Row key={index}>
                            <Table.Cell> <Link to={'/car/' + rent.carId}> {rent.regNumber} </Link> </Table.Cell>
                            <Table.Cell> {rent.value} </Table.Cell>
                            <Table.Cell> {moment(rent.startDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell> {moment(rent.endDate).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell textAlign='right'>
                                <Button animated='vertical' color='green' onClick={() => openInfoModal(rent._id)} >
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

export default EndedRents;