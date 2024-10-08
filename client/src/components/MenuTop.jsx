import React from 'react';
import { Menu, Responsive, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Auth from '../utils/authorize';

class MenuTop extends React.Component {

    constructor() {
        super();
        this.state = { username: '' };
    }

    componentDidMount() {
        this.setState({ username: Auth.parseToken().username });
    }

    render() {
        return (
            <Menu size='large' inverted style={{ backgroundColor: '#303f9f', height: 48, borderRadius: 0 }}>
                <Menu.Item style={{ margin: 0 }}>
                    <Responsive {...Responsive.onlyMobile}>
                        <Dropdown item text='Menu'>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to='/overview' content='Overview' icon='home' />
                                <Dropdown.Item as={Link} to='/cars' content='Cars' icon='truck' />
                                <Dropdown.Item as={Link} to='/reports/1/1/1' content='History' icon='history' />
                                <Dropdown.Item as={Link} to='/history' content='Reports' icon='book' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Responsive>
                </Menu.Item>
                <Menu.Item className="menu-item-top">
                    Logged in as&nbsp;<b>{this.state.username}</b>
                </Menu.Item>

                <Menu.Menu position='right'>
                    { 
                    <Dropdown item text='Language'>
                        <Dropdown.Menu>
                            <Dropdown.Item> EN </Dropdown.Item>
                            <Dropdown.Item> LT </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    }
                    <Menu.Item as={Link} to='/logout' content='Logout' icon='log out' />
                </Menu.Menu>
            </Menu>
        );
    }
}

export default MenuTop;