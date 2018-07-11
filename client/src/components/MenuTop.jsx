import React from 'react';
import { Menu, Button, Label, Icon } from 'semantic-ui-react';

const MenuTop = () => (
    <Menu size='large' inverted fixed='top' style={{ paddingLeft: '190px', backgroundColor: '#303f9f'}}>
        <Menu.Item as='a' position='left' icon='bars'/>
    </Menu>
);

export default MenuTop;