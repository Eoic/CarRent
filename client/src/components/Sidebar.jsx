import React, { Component } from 'react';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import MenuTop from './MenuTop';

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
            <Sidebar.Pushable as={Segment} style={{ borderRadius: '0px', borderStyle: 'none', marginBottom: '0px', backgroundColor: '#eceff1' }}>
                <MenuTop/>
                <Sidebar as={Menu} icon='labeled' inverted vertical width='thin' visible style={{ backgroundColor: '#303f9f', width: '190px' }}>
                    <Menu.Item style={{ backgroundColor: '#001970', height: '42.85px'}} content={
                        <ItemText content='NAVIGATION'/>
                    } />
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

                <Sidebar.Pusher style={{ marginLeft: '60px', marginRight: '170px' }}>
                    {this.props.children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default SidebarMenu;