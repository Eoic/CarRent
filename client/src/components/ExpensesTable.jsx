import React, { Component } from 'react';
import { Table, Icon, Button, Statistic } from 'semantic-ui-react';
import { getCosts, deleteCost } from '../actions/carActions';
import store from '../stores/CarStore';
import moment from 'moment';

class ExpensesTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            costs: store.getCosts()
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

    fetchData() {
        getCosts(this.props.carId);
    }

    updateList() {
        this.setState({ costs: store.getCosts() });
    }

    handleDelete = (id) => {
        deleteCost(id);
    }

    render() {
        return (
            <Table selectable unstackable singleLine compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell> Value </Table.HeaderCell>
                        <Table.HeaderCell> Description </Table.HeaderCell>
                        <Table.HeaderCell> Date Added </Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.costs.map(cost =>
                        <Table.Row key={cost._id}>
                            <Table.Cell> 
                                {cost.value} 
                            </Table.Cell>
                            <Table.Cell> {cost.details} </Table.Cell>
                            <Table.Cell> {moment(cost.addedAt).format('YYYY/MM/DD HH:mm')} </Table.Cell>
                            <Table.Cell>
                                <Button icon color='google plus' onClick={this.handleDelete.bind(this, cost._id)}>
                                    <Icon name='trash' />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Statistic color='red' horizontal>
                                <Statistic.Value>
                                    &euro; {this.state.costs.sum}
                                </Statistic.Value>
                                <Statistic.Label content={"TOTAL"} />
                            </Statistic>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default ExpensesTable;