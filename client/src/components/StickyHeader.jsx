import React, { useState, useEffect } from 'react';
import { Menu, Header, Icon } from 'semantic-ui-react';
import axios from 'axios'

function StickyHeader() {
    const [data, setData] = useState({ data: '' });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/app/name')
            setData(response.data)
        };

        fetchData();
    }, [])

    return (
        <Menu fixed='top' style={{boxShadow: "0px 2px 5px 1px #616161"}}>
            <Menu.Item as={Header}>
                <Icon name='truck'/>
                {data.appName}
            </Menu.Item>
        </Menu>
    )
}

export default StickyHeader;