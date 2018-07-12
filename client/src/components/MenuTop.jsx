import React from 'react';
import { Menu } from 'semantic-ui-react';

const MenuTop = () => (
    <Menu size='large' inverted style={{ paddingLeft: '190px', backgroundColor: '#303f9f'}}>
        <Menu.Item as='a' position='left' icon='bars'/>
    </Menu>
);

export default MenuTop;