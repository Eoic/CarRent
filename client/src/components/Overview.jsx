import React, { Component } from 'react';
import { Grid, Segment, Statistic, Header } from 'semantic-ui-react';
import store from '../stores/CarStore';
import { getTurnover } from '../actions/carActions';
import moment from 'moment';

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
                <Grid columns={2} style={{ marginTop: '15px', marginLeft: '0px' }} >
                    <Grid.Column width={10} style={{ height: '450px' }} elevated='true' as={Segment}>
                        
                    </Grid.Column>
                    <Grid.Column width={6} style={{ paddingTop: '0px' }}>
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