import React, { Component } from 'react';

const pageStyle = {
    size: {
        width: 595,
        height: 842,
        border: '1px solid #2a2a2a',
        marginTop: 15
    }
}

class Invoice extends Component {

    render() {
        return (
            <div style={pageStyle.size}>
                <p> First name: { this.props.invoiceData.firstName } </p>
                <p> LastName: { this.props.invoiceData.lastName } </p>
                <p> Phone: { this.props.invoiceData.phone} </p>
                <p> Deposit: { this.props.invoiceData.deposit + '' } </p>
                <p> Payment: {this.props.invoiceData.payment.text} </p>
            </div>
        );
    }
}

export default Invoice;