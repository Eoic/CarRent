import React, { Component } from 'react';
import { Grid, Segment, Statistic, Table } from 'semantic-ui-react';
import { ResponsiveLine } from '@nivo/line'
import DatePicker from 'react-datepicker';
import moment from 'moment';

const chartData = [
    {
        "id": "Income",
        "data": [
            {
                "x": "Jan",
                "y": 25
            },
            {
                "x": "Feb",
                "y": 19
            },
            {
                "x": "Mar",
                "y": 5
            },
            {
                "x": "Apr",
                "y": 17
            },
            {
                "x": "May",
                "y": 8
            },
            {
                "x": "Jun",
                "y": 18
            },
            {
                "x": "Jul",
                "y": 39
            },
            {
                "x": "Aug",
                "y": 41
            },
            {
                "x": "Sep",
                "y": 19
            },
            {
                "x": "Oct",
                "y": 0
            },
            {
                "x": "Nov",
                "y": 0
            },
            {
                "x": "Dec",
                "y": 0
            }
        ]
    },
    {
        "id": "Expenses",
        "data": [
            {
                "x": "Jan",
                "y": 11
            },
            {
                "x": "Feb",
                "y": 29
            },
            {
                "x": "Mar",
                "y": 14
            },
            {
                "x": "Apr",
                "y": 27
            },
            {
                "x": "May",
                "y": 28
            },
            {
                "x": "Jun",
                "y": 28
            },
            {
                "x": "Jul",
                "y": 23
            },
            {
                "x": "Aug",
                "y": 14
            },
            {
                "x": "Sep",
                "y": 7
            },
            {
                "x": "Oct",
                "y": 7
            },
            {
                "x": "Nov",
                "y": 0
            },
            {
                "x": "Dec",
                "y": 0
            }
        ]
    }
]

class Overview extends Component {

    constructor() {
        super();
        this.state = {
            startDate: moment()
        }
        this.handleChange = this.handleChange.bind(this);
    }

    onChange = date => this.setState({ date })

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <div>
                <Grid columns={2} stackable style={{ marginTop: '15px', marginLeft: '0px' }}>
                    <Grid.Column width={12} style={{ height: '450px', minWidth: '780px' }} elevated='true' as={Segment}>
                        <ResponsiveLine
                            data={chartData}
                            margin={{
                                "top": 25,
                                "right": 110,
                                "bottom": 25,
                                "left": 60
                            }}
                            minY={0}
                            maxY={60}
                            stacked={true}
                            axisBottom={{
                                "orient": "bottom",
                                "tickSize": 10,
                                "tickPadding": 10,
                                "tickRotation": 0
                            }}
                            axisLeft={{
                                "orient": "left",
                                "tickSize": 15,
                                "tickPadding": 5,
                                "tickRotation": 0,
                                "legend": "Value, EUR",
                                "legendOffset": -40,
                                "legendPosition": "center"
                            }}
                            dotSize={10}
                            curve='monotoneX'
                            dotColor="inherit:darker(0.3)"
                            colors="dark2"
                            enableArea={true}
                            dotBorderWidth={2}
                            dotBorderColor="#ffffff"
                            enableDotLabel={false}
                            dotLabel="y"
                            dotLabelYOffset={-12}
                            enableGridX={false}
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                            legends={[
                                {
                                    "anchor": "bottom-right",
                                    "direction": "column",
                                    "translateX": 100,
                                    "itemWidth": 80,
                                    "itemHeight": 20,
                                    "symbolSize": 12,
                                    "symbolShape": "circle"
                                }
                            ]}
                        />
                    </Grid.Column>
                    <Grid.Column width={4} style={{ paddingTop: '0px' }}>
                        <Grid.Row>
                            <Segment textAlign='center'>
                                <Statistic color='green'>
                                    <Statistic.Value> + 45 &euro; </Statistic.Value>
                                    <Statistic.Label>Income this month</Statistic.Label>
                                </Statistic>
                            </Segment>
                        </Grid.Row>

                        <Grid.Row>
                            <Segment textAlign='center' style={{ marginTop: '15px' }}>
                                <Statistic color='red'>
                                    <Statistic.Value> + 50 &euro; </Statistic.Value>
                                    <Statistic.Label> Expenses this month</Statistic.Label>
                                </Statistic>
                            </Segment>
                        </Grid.Row>

                        <Grid.Row textAlign='left' style={{ marginTop: '12px' }}>
                            <DatePicker
                                inline
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </div >
        );
    }
}

export default Overview;