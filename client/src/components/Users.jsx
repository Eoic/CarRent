import React, { Component } from 'react';
import {Button, Table} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import store from '../stores/UserStore'
import { getUsers } from "../actions/userActions";
import BlankTable from "./BlankTable";
import ConfirmAction from "./ConfirmAction";
import {switchUserType, switchUserVerification} from "../actions/userActions";
import {defaultFormatUtc} from "moment";

const SwitchType = {
    Admin: 0,
    Verification: 1
}

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: store.getUsers(),
            fetching: false,
            confirmOpen: false,
            confirmMessage: '',
            confirmType: {},
            userId: {}
        };

        this.updateList = this.updateList.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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

    handleSwitch(type, currentValue, userId) {
        let message = ''

        switch (type) {
            case SwitchType.Admin:

                if (currentValue === true)
                    message = 'Downgrade this account to normal user'
                else message = 'Upgrade this account to administrator'
                break;
            case SwitchType.Verification:
                if (currentValue === true)
                    message = 'Make this account verified'
                else message = 'Make this account unverified'
                break;
            default:
                break
        }

        this.setState({
            confirmOpen: true,
            confirmMessage: message,
            userId: userId,
            confirmType: type
        })
    }

    handleConfirm() {
        switch (this.state.confirmType) {
            case SwitchType.Verification:
                switchUserVerification(this.state.userId)
                break
            case SwitchType.Admin:
                switchUserType(this.state.userId)
                break;
            default:
                break;
        }

        this.setState({ confirmOpen: false });
    }

    handleCancel() {
        this.setState({
            confirmOpen: false,
            confirmMessage: '',
            userId: {}
        });
    }

    render() {
        const { users } = this.state;

        return (
            <Table selectable size='large' stackable compact sortable celled singleLine>
                <ConfirmAction open={this.state.confirmOpen}
                               handleConfirm={this.handleConfirm}
                               handleCancel={this.handleCancel}
                               content={<p> {this.state.confirmMessage}? </p>}
                               title={"Are you sure?"}/>
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
                            <Table.Cell textAlign='center' width={1} className='align-right-large'>
                                <Button onClick={() => this.handleSwitch(SwitchType.Verification, user.is_verified, user._id)} fluid color={user.is_verified ? 'green' : 'red'}> {user.is_verified ? 'Yes' : 'No' } </Button>
                            </Table.Cell>
                            <Table.Cell textAlign='center' width={1} className='align-right-large'>
                                <Button onClick={() => this.handleSwitch(SwitchType.Admin, user.is_admin, user._id)} fluid color={user.is_admin ? 'green' : 'red'}> {user.is_admin ? 'Yes' : 'No'} </Button>
                            </Table.Cell>
                        </Table.Row>
                    )}
                    {!users.length && <BlankTable colSpan={4} text={'No registered users.'} />}
                </Table.Body>
            </Table>
        );
    }
}

export default withRouter(Users);