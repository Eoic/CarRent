import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import shortid from 'shortid';

const dummyData = [
    {
        _id: '1',
        value: '12.45',
        description: 'none'
    },
    {
        _id: '2',
        value: '2.45',
        description: 'none'
    },
]

class ExpensesTable extends Component {

    handleEdit = (id) => {

    }

    handleDelete = (id) => {

    }

    render() {
        return (
            <Table selectable compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell> Value, &euro; </Table.HeaderCell>
                        <Table.HeaderCell> Description </Table.HeaderCell>
                        <Table.HeaderCell> Date Added </Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dummyData.map(data =>
                        <Table.Row key={shortid.generate()}>
                            <Table.Cell> {data.value} </Table.Cell>
                            <Table.Cell> {data.description} </Table.Cell>
                            <Table.Cell> {new Date().toLocaleDateString('lt-LT')} </Table.Cell>
                            <Table.Cell>
                                <Button icon color='google plus' onClick={this.handleDelete.bind(this, data._id)}>
                                    <Icon name='trash'/>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            14.90 <Icon name='euro' /> TOTAL
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default ExpensesTable;

/*
{ dummyData.map(obj => {
                        <Table.Row key={obj.key}>
                            <Table.Cell> {obj.value} </Table.Cell>
                            <Table.Cell> {obj.quantity} </Table.Cell>
                            <Table.Cell> {obj.description} </Table.Cell>
                            <Table.Cell>
                                <Button color='red' icon='trash'/>    
                            </Table.Cell>
                        </Table.Row>
                    }) }

*/