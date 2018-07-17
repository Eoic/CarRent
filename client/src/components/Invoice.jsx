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
                {this.props.content}
            </div>
        );
    }
}

export default Invoice;