import React from 'react';
import { Menu, Header, Icon } from 'semantic-ui-react';

const StickyHeader = () => (
    <Menu fixed='top'>
        <Menu.Item as={Header}>
            <Icon name='truck'/>
            TITLE
        </Menu.Item>
    </Menu>
);

export default StickyHeader;