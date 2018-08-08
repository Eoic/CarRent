import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
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
                    <Menu.Item as={NavLink} to='/reports/1/1/1' content={
                        <ItemText content='History' icon='history' />
                    } />
                    <Menu.Item as={NavLink} to='/settings' content={
                        <ItemText content='Settings' icon='cogs' />
                    } />
                </Menu>

                <div style={sidebarStyles.pushedContent}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default SidebarMenu;