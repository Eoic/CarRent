import React, { Component } from 'react';
import { Segment, Grid, Divider, Statistic, Icon } from 'semantic-ui-react';

class Overview extends Component {
    render() {
        return (
            <Grid stackable columns={3}>
                <Grid.Column>
                    <Segment.Group horizontal>
                        <Segment color='green'>
                            <Statistic size='huge' color='green'>
                                <Statistic.Value> + &euro; 0 </Statistic.Value>
                                <Statistic.Label> Profit this month </Statistic.Label>
                            </Statistic>
                            <Divider />
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
                <Grid.Column>
                    <Segment.Group horizontal>
                        <Segment color='red' >
                            <Statistic size='huge' color='red'>
                                <Statistic.Value> - &euro; 0 </Statistic.Value>
                                <Statistic.Label> Expenses this month </Statistic.Label>
                            </Statistic>
                            <Divider />
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
                <Grid.Column>
                    <Segment.Group horizontal>
                        <Segment color='blue'>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='truck' />  
                                    5
                            </Statistic.Value>
                                <Statistic.Label> Cars available </Statistic.Label>
                            </Statistic>
                            <Divider />
                        </Segment>
                        <Segment color='blue'>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='suitcase' /> 0
                                </Statistic.Value>
                                <Statistic.Label> Cars leased </Statistic.Label>
                            </Statistic>
                            <Divider />
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Overview;