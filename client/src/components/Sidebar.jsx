import React, { Component } from 'react';
import { Sidebar, Segment, Menu, Icon, Header, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
                    <Menu.Item as={Link} to='/overview' content={
                        <ItemText content='Overview' icon='home'/>
                    } />
                    <Menu.Item as={Link} to='/cars' content={
                        <ItemText content='Cars' icon='truck'/>
                    } />
                    <Menu.Item as={Link} to='/reports' content={
                        <ItemText content='History' icon='history'/>
                    } />
                    <Menu.Item as={Link} to='/settings' content={
                        <ItemText content='Setings' icon='cogs'/>
                    } />
                </Sidebar>

                <Sidebar.Pusher>
                    <Segment>
                        {this.props.children}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default SidebarMenu;