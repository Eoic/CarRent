import React, { Component } from 'react';
import moment from 'moment';

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 0,
            time: {},
            expired: true
        };
        this.startTimer = this.startTimer.bind(this);
        this.countdown = this.countdown.bind(this);
        this.getDuration = this.getDuration.bind(this);
        this.secondsToTime = this.secondsToTime.bind(this);
    }

    componentDidMount() {
        this.getDuration();
    }

    // Get duration in seconds for countdown.
    getDuration() {
        const startDate = moment(this.props.startDate);
        const endDate = moment(this.props.endDate);
        const currentDate = moment();

        if (moment(currentDate).isBetween(startDate, endDate)) {
            const utc_one = Date.UTC(currentDate.get('y'),
                currentDate.get('month'),
                currentDate.get('D'),
                currentDate.get('hour'),
                currentDate.get('minute'));

            const utc_two = Date.UTC(endDate.get('y'),
                endDate.get('month'),
                endDate.get('D'),
                endDate.get('hour'),
                endDate.get('minute'));

            const duration = Math.floor((utc_two - utc_one) / 60000) * 60; // Seconds.
            this.setState({ duration: duration, expired: false }, this.startTimer);
        }
        else this.setState({ expired: true });
    }

    secondsToTime() {
        let days = Math.floor((this.state.duration / 3600) / 24);
        let hours = Math.floor((this.state.duration / 3600) % 24);
        let minutes = Math.floor((this.state.duration / 60) % 60);

        let obj = {
            "d": days,
            "h": hours,
            "m": minutes
        };

        return obj;
    }

    startTimer() {
        if (!this.state.expired)
            setInterval(this.countdown, 1000);
    }

    countdown() {

        // Remove one second, set state so a re-render happens.
        let duration = this.state.duration - 1;

        this.setState({
            time: this.secondsToTime(duration),
            duration: duration,
        });

        // Check if we're at zero.
        if (duration === 0) {
            clearInterval(this.timer);
            this.setState({
                expired: true
            });
        }
    }

    render() {
        if (!this.state.expired) {
            return (
                <p> {this.state.time.d} days {this.state.time.h} hours {this.state.time.m} minutes </p>
            );
        } else return ( <p> - </p>); 
    }
}

export default Countdown;