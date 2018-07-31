import React, { Component } from 'react';
//import { Grid, GridRow } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/lt';

const pageStyle = {
    size: {
        width: '21cm',
        height: '29.7cm',
        marginTop: 15,
        border: '1px solid #2a2a2a',
        padding: '30mm 45mm 30mm 45mm'
    },
    header: {
        textAlign: 'center',
        fontSize: 18
    },
    subheader: {
        textDecoration: 'underline'
    },
    noSpacing: {
        paddingTop: 0,
        marginTop: 0
    },
    columns: {
        WebkitColumnCount: '2', /* Chrome, Safari, Opera */
        MozColumnCount: '2',    /* Firefox */
        columnCount: '2'
    }
}

class Invoice extends Component {

    constructor() {
        super();
        this.state = {
            timestamp: moment().format('LL').toLocaleString()
        }
    }

    render() {
        return (
            <div style={pageStyle.size}>
                <h1 style={pageStyle.header}> PVM SĄSKAITA FAKTŪRA </h1>

                <b> {this.state.timestamp} </b>

                <table>
                    <div style={{width: '100px' }}>
                        <b style={pageStyle.subheader}> Pardavėjas </b> <br />
                        <h3 style={pageStyle.noSpacing}> UAB Rajesas </h3>
                    </div>

                    <div style={{ display: 'inline', width: '100px' }}>
                        <b style={pageStyle.subheader}> Pirkėjas </b> <br />
                        <b> {this.props.invoiceData.firstName} {this.props.invoiceData.lastName} </b>
                    </div>
                </table>

                <p> Phone: {this.props.invoiceData.phone} </p>
                <p> Deposit: {this.props.invoiceData.deposit + ''} </p>
                <p> Payment: {this.props.invoiceData.payment.text} </p>

            </div>
        );
    }
}

export default Invoice;