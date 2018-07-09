import React, { Component } from 'react';
import { Table, Dropdown, Button, Icon } from 'semantic-ui-react';
import * as CarActions from '../actions/carActions';
import store from '../stores/CarStore';
import CarModal from './CarModal';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Cars extends Component{

    constructor(props){
        super(props);
        this.state = { cars: store.getCars() };
        this.updateList = this.updateList.bind(this);
    }

    componentWillMount(){
        CarActions.getCars();
    }

    componentDidMount(){
        store.on('storeUpdated', this.updateList);
    }

    componentWillUnmount(){
        store.removeListener('storeUpdated', this.updateList);
    }

    updateList(){
        CarActions.getCars();
        this.setState({ cars: store.getCars() });
    }

    handleDelete = id => {
        CarActions.deleteCar(id);
    }

    handleEdit = id => {
        this.props.history.push('/car/' + id);
    }

    render(){
        return(
            <Table selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell> Model </Table.HeaderCell>
                        <Table.HeaderCell> Registration nr. </Table.HeaderCell>
                        <Table.HeaderCell> Status </Table.HeaderCell>
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { this.state.cars.map(car => 
                        <Table.Row key={car._id}>
                            <Table.Cell> {car.model} </Table.Cell>
                            <Table.Cell> 
                                <Link to={'/car/' + car._id} > {car.registrationNumber} </Link> 
                            </Table.Cell>
                            <Table.Cell> {car.status} </Table.Cell>
                            <Table.Cell> 
                                <Dropdown icon='ellipsis horizontal'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={this.handleEdit.bind(this, car._id)}> Edit </Dropdown.Item>
                                        <Dropdown.Item onClick={this.handleDelete.bind(this, car._id)}> Delete </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                            <CarModal/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default withRouter(Cars);