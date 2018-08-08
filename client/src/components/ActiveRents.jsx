import React, { Component } from 'react';
import { Table, Menu, Icon, Button, Modal, Grid, Form, Divider, Dropdown } from 'semantic-ui-react';
import { getRents, getRentById, endRent, updateRent, deleteRent } from '../actions/carActions';
import store from '../stores/CarStore';
import Countdown from './Countdown';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const style = {
    infoLabel: { width: 70 },
    typeHeader: {
        backgroundColor: '#3ab522',
        color: '#FFFFFF',
        fontSize: '120%'
    }
}

const InfoLabel = (props) => (
    <label style={style.infoLabel}>
        {props.content}
    </label>
);

const depositOptions = [
    {
        text: 'Yes',
        value: true
    },
    {
        text: 'No',
        value: false
    }
];

class ActiveRents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rents: [],
            size: 0,
            updateRequired: false,
            modalOpen: false,
            rent: {
                name: '',
                surname: '',
                odometer: '',
                value: '',
                deposit: '',
                phone: '',
            },
            editing: false
        }

        this.updateRentsList = this.updateRentsList.bind(this);
        this.showRentInfo = this.showRentInfo.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDepositChange = this.handleDepositChange.bind(this);
    }

    openInfoModal(id) {
        getRentById(id);
    }

    cancelRent = id => {
        endRent(id);
    }

    handleDepositChange(event, data) {

        const depositTaken = data.value;

        this.setState(prevState => ({
            rent: {
                ...prevState.rent,
                deposit: depositTaken
            }
        }));
    }

    deleteRent = id => {
        deleteRent(id);
    }

    showRentInfo() {
        this.setState({ rent: store.getRentById(), modalOpen: true });
    }

    fetchData() {
        getRents(this.props.match.params.active);
    }

    componentDidMount() {
        store.addListener('storeUpdated', this.updateRentsList);
        store.addListener('rentInfoReceived', this.showRentInfo);
        store.addListener('updateRequired', this.fetchData);
        getRents(this.props.page.active);
    }

    componentWillUnmount() {
        store.removeListener('storeUpdated', this.updateRentsList);
        store.removeListener('rentInfoReceived', this.showRentInfo);
        store.removeListener('updateRequired', this.fetchData);
    }

    updateRentsList() {
        this.setState({ 
            rents: store.getRents().rents, 
            size: store.getRents().size 
        });
    }

    componentDidUpdate() {
        if (this.state.updateRequired) {
            getRents(this.props.page.active);
            this.setState({ updateRequired: false });
        }
    }

    handleChange(event, data) {

        const value = event.target.value;
        const name = event.target.name;

        this.setState(prevState => ({
            rent: {
                ...prevState.rent,
                [name]: value
            }
        }));
    }

    handleSubmit() {
        updateRent(this.state.rent);
        toast.success("Info updated");
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

                <Modal size='small' open={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false })} closeOnDimmerClick>
                    <Modal.Header>
                        RENT INFO
                    <span style={{ float: 'right' }}>
                            <Icon link name='pencil square' size='large' color={(this.state.editing) ? 'green' : 'grey'} onClick={() => this.setState({
                                editing: !this.state.editing
                            })} />
                        </span>
                    </Modal.Header>
                    <Modal.Content>
                        <Grid columns='3'>
                            <Grid.Column>
                                <p> Rent start {moment(this.state.rent.startDate).format('YYYY/MM/DD HH:mm')}    </p>
                            </Grid.Column>

                            <Grid.Column>
                                <p> Rent end {moment(this.state.rent.endDate).format('YYYY/MM/DD HH:mm')}        </p>
                            </Grid.Column>

                            <Grid.Column>
                                <p> Added {moment(this.state.rent.addedAt).format('YYYY/MM/DD HH:mm')}           </p>
                            </Grid.Column>
                        </Grid>

                        <Grid columns='2'>
                            <Grid.Column>
                                <Form widths='equal'>
                                    <Form.Input inline name='name' label={<InfoLabel content='First name' />} readOnly={!this.state.editing} value={this.state.rent.name} onChange={this.handleChange} />
                                    <Form.Input inline name='surname' label={<InfoLabel content='Last name' />} readOnly={!this.state.editing} value={this.state.rent.surname} onChange={this.handleChange} />
                                    <Form.Input inline name='odometer' label={<InfoLabel content='Kilometers' />} readOnly={!this.state.editing} value={this.state.rent.odometer} onChange={this.handleChange} />
                                </Form>
                            </Grid.Column>

                            <Grid.Column>
                                <Form>
                                    <Form.Input inline name='phone' label={<InfoLabel content='Phone' />} readOnly={!this.state.editing} value={this.state.rent.phone} onChange={this.handleChange} />
                                    <Form.Input inline name='value' label={<InfoLabel content='Income' />} readOnly={!this.state.editing} value={this.state.rent.value} onChange={this.handleChange} />
                                    <Form.Dropdown inline selection options={depositOptions} compact defaultValue={this.state.rent.deposit} onChange={this.handleDepositChange} label={<InfoLabel content='Deposit' />} />
                                </Form>
                            </Grid.Column>
                        </Grid>

                        <Divider />

                        <Button color='green' content='Save changes' onClick={this.handleSubmit} />
                    </Modal.Content>
                </Modal>

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
                                <Button animated='vertical' color='green' onClick={this.openInfoModal.bind(this, rent._id)}>
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

