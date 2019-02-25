import React from 'react';
import { Menu, Header, Icon } from 'semantic-ui-react';

const StickyHeader = () => (
    <Menu fixed='top' style={{ boxShadow: "0px 2px 5px 1px #616161" }}>
        <Menu.Item as={Header}>
            <Icon name='truck'/>
            RAJESAS
        </Menu.Item>
    </Menu>
);

export default StickyHeader;