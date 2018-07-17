import React, { Component } from 'react';

const pageStyle = {
    size: {
        width: 842,
        height: 595
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