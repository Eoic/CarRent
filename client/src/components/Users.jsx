import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import store from '../stores/UserStore'
import { getUsers } from "../actions/userActions";
import BlankTable from "./BlankTable";

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: store.getUsers(),
            fetching: false,
        };

        this.updateList = this.updateList.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        store.on('storeUpdated', this.updateList);
        store.on('updateRequired', this.fetchData);
        this.fetchData();
    }

    componentWillUnmount() {
        store.removeListener('storeUpdated', this.updateList);
        store.removeListener('updateRequired', this.fetchData);
    }

    updateList() {
        this.setState({ users: store.getUsers() });
    }

    fetchData() {
        getUsers();
    }

    render() {
        const { users } = this.state;

        return (
            <Table selectable size='large' stackable compact sortable celled singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={2}> Username </Table.HeaderCell>
                        <Table.HeaderCell> Email </Table.HeaderCell>
                        <Table.HeaderCell> Is verified </Table.HeaderCell>
                        <Table.HeaderCell> Is admin </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map(user =>
                        <Table.Row key={user._id}>
                            <Table.Cell> {user.username} </Table.Cell>
                            <Table.Cell> {user.email} </Table.Cell>
                            <Table.Cell textAlign='center' width={1} className='align-right-large' > {user.is_verified ? 'Yes' : 'No' } </Table.Cell>
                            <Table.Cell textAlign='center' width={1} className='align-right-large' > {user.is_admin ? 'Yes' : 'No'} </Table.Cell>
                        </Table.Row>
                    )}
                    {!users.length && <BlankTable colSpan={4} text={'No registered users.'} />}
                </Table.Body>
            </Table>
        );
    }
}

export default withRouter(Users);