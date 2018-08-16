import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuTop = () => (
    <Menu size='large' inverted style={{ paddingLeft: '190px', backgroundColor: '#303f9f', borderRadius: 0 }}>
        <Menu.Item position='right' as={Link} to='/logout' content='Logout' />
    </Menu>
);

export default MenuTop;