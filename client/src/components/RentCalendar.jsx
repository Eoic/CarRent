import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../styles/calendar.scss';

class RentCalendar extends Component {
    render() {
        return (
            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin]} />
        );
    }
}

export default RentCalendar;