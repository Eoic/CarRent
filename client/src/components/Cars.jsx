import React, { Component } from 'react';
import { Table, Dropdown, Button, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import * as CarActions from '../actions/carActions';
import store from '../stores/CarStore';
import CarModal from './CarModal';

class Cars extends Component{

    constructor(props){
        super(props);
        this.state = {
            cars: [],
            fetching: true
        }
    }

    componentDidMount(){
        CarActions.getCars();
        store.on('storeUpdated', this.updateList);
    }

    componentWillUnmount(){
        store.removeListener('storeUpdated', this.updateList);
    }

    updateList(){
        CarActions.getCars();
    }

    handleDelete = id => {
        CarActions.deleteCar(id);
    }

    handleEdit = id => {
        
    }

    handleAdd(){
        CarActions.addCar({
            model: "dummyModel",
            registrationNumber: "regNumberDummy"
        });
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
                            <Table.Cell> {car.registrationNumber} </Table.Cell>
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
                            <CarModal>
                                <Button floated='left' icon labelPosition='left' primary size='small'>
                                    <Icon name='truck' /> ADD NEW
                                </Button>
                            </CarModal>
                        </Table.HeaderCell> 
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default withRouter(Cars);