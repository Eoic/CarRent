import React, { Component } from 'react';
import { Table } from "semantic-ui-react";

class BlankTable extends Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell colSpan={this.props.colSpan}>
                    {this.props.text}
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default BlankTable;