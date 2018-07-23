import React, { Component } from 'react';
import moment from 'moment';

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 0,
            expired: true
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.getDuration = this.getDuration.bind(this);
    }

    // Get duration in minutes for countdown.
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

            const duration = Math.floor((utc_two - utc_one) / 60000);
            this.setState({ duration: duration }, this.minutesToTime);
        } else 
            this.setState({ expired: true });
    }

    minutesToTime() {

        let days = Math.floor((this.state.duration / 60) / 24);
        let hours = Math.floor((this.state.duration / 60) % 24);
        let minutes = Math.floor(this.state.duration % 60);

        let obj = {
            "d": days,
            "h": hours,
            "m": minutes
        };
    }

    componentDidMount() {
        this.getDuration();
    }

    startTimer() {
        /*
        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
        */
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        /*
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (duration === 0) {
            clearInterval(this.timer);
        }
        */
    }

    render() {
        return (<p> { /* this.state.time.d */} days {/*this.state.time.h*/} hours {/*this.state.time.m*/} minutes </p>);
    }
}

export default Countdown;