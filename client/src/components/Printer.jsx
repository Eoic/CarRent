import React, { Component } from 'react';
import store from '../stores/RentStore';

// Components
import ExternalWindow from './ExternalWindow';
import Invoice from './printing/Invoice';
import Contract from './printing/Contract';
import { PDFViewer } from '@react-pdf/renderer'

class Printer extends Component {
    constructor() {
        super();
        this.state = {
            rent: {},
            printWindowOpen: false,
            printInvoice: false,
            title: ''
        }

        this.handleInvoicePrint = this.handleInvoicePrint.bind(this);
        this.handleContractPrint = this.handleContractPrint.bind(this);
        this.closeWindowPortal = this.closeWindowPortal.bind(this);
    }

    handleInvoicePrint() {
        this.setState({
            printWindowOpen: true,
            printInvoice: true,
            rent: store.getRent(),
            title: 'Invoice Print'
        });
    }

    handleContractPrint() {
        this.setState({
            printWindowOpen: true,
            printInvoice: false,
            rent: store.getRent(),
            title: 'Contract Print'
        });
    }

    closeWindowPortal() {
        this.setState({ printWindowOpen: false });
    }

    componentDidMount() {
        store.addListener('printInvoice', this.handleInvoicePrint);
        store.addListener('printContract', this.handleContractPrint);
    }

    componentWillUnmount() {
        store.removeListener('printInvoice', this.handleInvoicePrint);
        store.removeListener('printContract', this.handleContractPrint);
    }

    render() {
        return (
            <div>
                {this.state.printWindowOpen && (
                    <ExternalWindow title={this.state.title} closeWindowPortal={this.closeWindowPortal} >
                        <PDFViewer style={{ width: '100%', height: '100%'}}>
                            {(this.state.printInvoice) ? <Invoice rent={this.state.rent} /> : <Contract rent={this.state.rent} />}
                        </PDFViewer>
                    </ExternalWindow>
                )}
            </div>
        );
    }
}

export default Printer;