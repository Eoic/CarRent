import React from 'react';
import { Menu, Header, Icon } from 'semantic-ui-react';

const StickyHeader = () => (
    <Menu fixed='top'>
        <Menu.Item as={Header}>
            <Icon name='truck'/>
            RAJESAS
        </Menu.Item>
    </Menu>
);

export default StickyHeader;