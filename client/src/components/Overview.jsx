import React, { Component } from 'react';
import { Grid, Segment, Statistic, Header } from 'semantic-ui-react';
import { ResponsiveLine } from '@nivo/line'
import store from '../stores/CarStore';
import { getTurnover } from '../actions/carActions';
import moment from 'moment';

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
            startDate: moment(),
            turnover: {},
            fetching: true,
            chartState: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateSummary = this.updateSummary.bind(this);
        this.generateChartData = this.generateChartData.bind(this);
    }

    generateChartData() {

        let incomeObj = {
            "id": "Income",
            "data": []
        };

        let expensesObj = {
            "id": "Expenses",
            "data": []
        }

        for(let i = 0; i < 12; i++){
            incomeObj.data.push({
                "x": months[i],
                "y": 0
            });

            expensesObj.data.push({
                "x": months[i],
                "y": 0
            });
        }

        this.setState({ chartState: [...this.state.chartState, [...incomeObj, expensesObj]] });
    }

    updateSummary() {
        this.setState({ turnover: store.getCashTurnover(), fetching: false });
    }

    componentDidMount() {
        store.addListener('turnoverReceived', this.updateSummary);
        getTurnover();
    }

    componentWillUnmount() {
        store.removeListener('turnoverReceived', this.updateSummary);
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
                <Grid columns={2} style={{ marginTop: '15px', marginLeft: '0px' }}>
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
                        <Segment.Group>
                            <Segment as={Header}> INCOME </Segment>
                            <Segment>
                                <Statistic.Group horizontal>
                                    <Statistic horizontal color='green'>
                                        <Statistic.Value> &euro; {(this.state.fetching) ? 0 : this.state.turnover.rentsMonthly} </Statistic.Value>
                                        <Statistic.Label> This month </Statistic.Label>
                                    </Statistic>

                                    <Statistic horizontal color='green'>
                                        <Statistic.Value> &euro; {(this.state.fetching) ? 0 : this.state.turnover.rentsTotal} </Statistic.Value>
                                        <Statistic.Label> Total </Statistic.Label>
                                    </Statistic>
                                </Statistic.Group>
                            </Segment>
                        </Segment.Group>

                        <Segment.Group>
                            <Segment as={Header}> EXPENSES </Segment>
                            <Segment>
                                <Statistic.Group horizontal>
                                    <Statistic horizontal color='red'>
                                        <Statistic.Value> &euro; {(this.state.fetching) ? 0 : this.state.turnover.expensesMonthly} </Statistic.Value>
                                        <Statistic.Label> This month </Statistic.Label>
                                    </Statistic>

                                    <Statistic horizontal color='red'>
                                        <Statistic.Value> &euro; {(this.state.fetching) ? 0 : this.state.turnover.expensesTotal} </Statistic.Value>
                                        <Statistic.Label> Total </Statistic.Label>
                                    </Statistic>
                                </Statistic.Group>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid>
            </div >
        );
    }
}

export default Overview;