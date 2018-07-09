import React, { Component } from 'react';
import { Sidebar, Segment, Menu, Icon, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

function ItemText(props){
    return(
        <p style={{ textAlign: 'left' }}>
            <Icon name={props.icon } style={{ marginRight: '15px' }}/>
            { props.content }
        </p>
    );
};

class SidebarMenu extends Component {
    render() {
        return (
            <Sidebar.Pushable as={Segment} style={{ borderRadius: '0px', borderStyle: 'none' }}>
                <Sidebar as={Menu} icon='labeled' inverted vertical visible width='thin' style={{ backgroundColor: '#303f9f' }}>
                    <Menu.Item as={Header} icon='map'/>
                    <Menu.Item as={NavLink} to='/overview' content={
                        <ItemText content='Overview' icon='home'/>
                    } />
                    <Menu.Item as={NavLink} to='/cars' content={
                        <ItemText content='Cars' icon='truck'/>
                    } />
                    <Menu.Item as={NavLink} to='/reports' content={
                        <ItemText content='History' icon='history'/>
                    } />
                    <Menu.Item as={NavLink} to='/settings' content={
                        <ItemText content='Setings' icon='cogs'/>
                    } />
                </Sidebar>

                <Sidebar.Pusher>
                    <Segment style={{ paddingRight: '165px'}}>
                        {this.props.children}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default SidebarMenu;