import React, { Component } from 'react';
import { Grid, Segment, Statistic, Header } from 'semantic-ui-react';
import store from '../stores/CarStore';
import { getTurnover } from '../actions/carActions';
import moment from 'moment';
import TurnoverChart from './TurnoverChart';

const style = {
    redText: { color: '#e44445' },
    greenText: { color: '#239e87'},
    redBackground: { backgroundColor: '#e44445'},
    greenBackgrond: { backgroundColor: '#239e87'}
}

class Overview extends Component {

    constructor() {
        super();
        this.state = {
            startDate: moment(),
            turnover: store.getCashTurnover()
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateSummary = this.updateSummary.bind(this);
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

    handleChange(date) {
        this.setState({ startDate: date });
    }

    render() {
        return (
            <div>
                <Grid stackable style={{ marginTop: '15px', marginLeft: '0px' }} >
                    <Grid.Column width={11} style={{ height: '448px' }} elevated='true' as={Segment}>
                        <TurnoverChart/>
                    </Grid.Column>
                    <Grid.Column width={5} style={{ paddingTop: '0px' }}>
                        <Segment.Group>
                            <Segment as={Header} inverted style={style.greenBackgrond}> INCOME </Segment>
                            <Segment>
                                <Statistic.Group horizontal>
                                    <Statistic horizontal style={{ display: 'block' }}>
                                        <Statistic.Value style={style.greenText}> &euro; {this.state.turnover.rentsMonthly} </Statistic.Value>
                                        <Statistic.Label> This month </Statistic.Label>
                                    </Statistic>

                                    <Statistic horizontal style={{ display: 'block' }}>
                                        <Statistic.Value style={style.greenText}> &euro; {this.state.turnover.rentsTotal} </Statistic.Value>
                                        <Statistic.Label> Total </Statistic.Label>
                                    </Statistic>
                                </Statistic.Group>
                            </Segment>
                        </Segment.Group>

                        <Segment.Group>
                            <Segment as={Header} inverted style={style.redBackground}> EXPENSES </Segment>
                            <Segment>
                                <Statistic.Group horizontal>
                                    <Statistic horizontal style={{ display: 'block' }}>
                                        <Statistic.Value style={style.redText}> &euro; {this.state.turnover.expensesMonthly} </Statistic.Value>
                                        <Statistic.Label> This month </Statistic.Label>
                                    </Statistic>

                                    <Statistic horizontal style={{ display: 'block' }}>
                                        <Statistic.Value style={style.redText}> &euro; {this.state.turnover.expensesTotal} </Statistic.Value>
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