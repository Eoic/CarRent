import React, { Component } from 'react';
import { Segment, Header, Grid, Dropdown, Icon } from 'semantic-ui-react';

// Flux.
import store from '../stores/AppStore';
import { } from '../actions/appActions';

const fontOptions = [
    { key: 1, text: 'Small', value: 1 },
    { key: 2, text: 'Medium', value: 2 },
    { key: 3, text: 'Large', value: 3 },
    { key: 4, text: 'Huge', value: 4 }
]

const colorOptions = [
    { key: 1, text: 'Light', value: 1 },
    { key: 2, text: 'Dark', value: 2 },
    { key: 3, text: 'Blue', value: 3 },
    { key: 4, text: 'High Contrast', value: 4 }
]

class Settings extends Component {

    constructor() {
        super();
        this.state = { fontValue: 2, colorValue: 3 };
    }

    handleFontChange = (e, { value }) => {
        this.setState({ fontValue: value });
    }

    handleColorChange = (e, { value }) => 
    {
        this.setState({ colorValue: value })
    }

    render() {

        return (
            <Segment.Group>
                <Segment as={Header} color='blue' inverted>
                    <Icon name='paint brush' /> Appearance
                </Segment>
                <Segment>
                    <Grid columns={4} container>

                        <Grid.Row textAlign='left'>
                            <Grid.Column verticalAlign='middle' textAlign='center'>
                                <label> Font Size </label>
                            </Grid.Column>
                            <Grid.Column>
                                <Dropdown
                                    onChange={this.handleFontChange}
                                    options={ fontOptions }
                                    placeholder='Choose an option'
                                    selection
                                    value={this.state.fontValue}
                                />
                            </Grid.Column>

                            <Grid.Column verticalAlign='middle' textAlign='center'>
                                <label> Color Scheme  </label>
                            </Grid.Column>
                            <Grid.Column>
                                <Dropdown
                                    onChange={this.handleColorChange}
                                    options={ colorOptions }
                                    placeholder='Choose an option'
                                    selection
                                    value={this.state.colorValue}
                                />
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Segment>

            </Segment.Group>
        );
    }
}

export default Settings;