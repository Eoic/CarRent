import React, { Component } from 'react';
import { Menu, Icon, Button, Modal, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import MenuTop from './MenuTop';

const sidebarStyles = {
    menu: {
        backgroundColor: '#303f9f',
        width: 190,
        bottom: 0,
        top: 0,
        position: 'fixed',
        padding: '0px 0px 0px 0px',
        margin: '0px 0px 0px 0px',
        borderRadius: 0
    },
    menuHeader: {
        backgroundColor: '#001970',
        borderRadius: 0,
        height: 42.85,
    },
    pushedContent: {
        marginLeft: 205,
        marginRight: 15,
        marginBottom: 15
    }
}

const carOptions = [
    {
        key: 0,
        value: 0,
        text: "EUB 123"
    },
    {
        key: 1,     
        value: 1,
        text: "EUB 321"
    }
];

function ItemText(props) {
    return (
        <p style={{ textAlign: 'left' }}>
            <Icon name={props.icon} style={{ marginRight: '15px' }} />
            {props.content}
        </p>
    );
};

class SidebarMenu extends Component {

    constructor() {
        super();
        this.state = {
            modalOpen: false
        };

        this.open = this.open.bind(this);
    }

    open = () => this.setState({ modalOpen: true });
    close = () => this.setState({ modalOpen: false });

    render() {
        return (
            <div>
                <MenuTop />

                <Modal closeOnDimmerClick={false} open={this.state.modalOpen}>
                    <Modal.Header> RENT NEW CAR </Modal.Header>
                    <Modal.Content>
                        <Dropdown placeholder='Registration number' search selection options={carOptions} />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' content={'Rent'} />
                        <Button color='red' content={'Close'} onClick={this.close} />
                    </Modal.Actions>
                </Modal>

                <Menu icon='labeled' inverted vertical visible='true' style={sidebarStyles.menu}>
                    <Menu.Item style={sidebarStyles.menuHeader} content={
                        <ItemText content='NAVIGATION' />
                    } />
                    <Menu.Item as={NavLink} to='/overview' content={
                        <ItemText content='Overview' icon='home' />
                    } />
                    <Menu.Item as={NavLink} to='/cars' content={
                        <ItemText content='Cars' icon='truck' />
                    } />
                    <Menu.Item as={NavLink} to='/reports/1' content={
                        <ItemText content='History' icon='history' />
                    } />
                    <Menu.Item as={NavLink} to='/settings' content={
                        <ItemText content='Settings' icon='cogs' />
                    } />

                    <Menu.Item style={sidebarStyles.menuHeader} content={
                        <ItemText content='ACTIONS' />
                    } />

                    <Menu.Item>
                        <Button style={{ borderRadius: 0 }} color='green' onClick={this.open}>
                            <Icon name='add' />
                            RENT NEW
                        </Button>
                    </Menu.Item>
                </Menu>

                <div style={sidebarStyles.pushedContent}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default SidebarMenu;