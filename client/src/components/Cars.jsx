import React, { Component } from 'react';
import { Table, Dropdown, Modal, Button } from 'semantic-ui-react';
import { getCars, deleteCar } from '../actions/carActions';
import store from '../stores/CarStore';
import CarModal from './CarModal';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const styles = {
    deleteButton: {
        color: '#c62828'
    }
}

class Cars extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cars: store.getCars(),
            deleteConfirmOpen: false,
            fetching: false
        };
        this.updateList = this.updateList.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
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
        this.setState({ cars: store.getCars() });
    }

    fetchData() {
        getCars();
    }

    handleDelete = id => {
        this.setState({ deleteConfirmOpen: true });
        //deleteCar(id);
    }

    closeConfirmModal() {
        this.setState({
            deleteConfirmOpen: false
        });
    }

    handleEdit = id => {
        this.props.history.push('/car/' + id);
    }

    render() {
        return (
            <Table selectable size='large' unstackable singleLine>

                <Modal size='mini' open={this.state.deleteConfirmOpen}>
                    <Modal.Header>Are you sure?</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete: [item] </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative icon='times' labelPosition='right' content='No' onClick={this.closeConfirmModal} />
                        <Button positive icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
                </Modal>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width='4'> Registration nr. </Table.HeaderCell>
                        <Table.HeaderCell> Model </Table.HeaderCell>
                        <Table.HeaderCell> Status </Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.cars.map(car =>
                        <Table.Row key={car._id}>
                            <Table.Cell>
                                <Link to={'/car/' + car._id} > {car.registrationNumber} </Link>
                            </Table.Cell>
                            <Table.Cell> {car.model} </Table.Cell>
                            <Table.Cell> {car.status} </Table.Cell>
                            <Table.Cell>
                                <Dropdown icon='ellipsis horizontal'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={this.handleEdit.bind(this, car._id)}> Edit </Dropdown.Item>
                                        <Dropdown.Item onClick={this.handleDelete.bind(this, car._id)} style={styles.deleteButton}> Delete </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                            <CarModal />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default withRouter(Cars);