import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import '../styles/calendar.scss';

class RentCalendar extends Component {

    constructor() {
        super();
        this.state = {
            calendarEvents: [
                { title: "Event Now", start: new Date(), end: '2019-06-29' }
            ]
        }
    }

    render() {
        return (
            <FullCalendar
                defaultView="dayGridMonth"
                displayEventEnd={true}
                header={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={this.calendarComponentRef}
                events={this.state.calendarEvents}
                dateClick={this.handleDateClick}
                eventClick={(info) => { console.log(info.event) }}
            />
        );
    }
}

export default RentCalendar;