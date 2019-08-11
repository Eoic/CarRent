import React, { Component } from 'react';
import { Modal, Button} from 'semantic-ui-react';

class ConfirmAction extends Component {
    render() {
        return (
            <Modal size='mini' open={this.props.open}>
                <Modal.Header> {this.props.title} </Modal.Header>
                <Modal.Content> {this.props.content} </Modal.Content>
                <Modal.Actions>
                    <Button negative icon='times' labelPosition='left' content='No' onClick={this.props.handleCancel} />
                    <Button positive icon='checkmark' labelPosition='left' content='Yes' onClick={this.props.handleConfirm} />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default ConfirmAction;