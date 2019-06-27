import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';

import '../styles/calendar.scss';

class RentCalendar extends Component {

    constructor() {
        super();
        this.state = {
            calendarEvents: [],
            eventInfoOpen: false
        }
    }

    componentDidMount() {
        axios.get('/api/rents/monthly').then(response => {
            if (typeof response.data.activeRents === "undefined")
                return;

            this.setState({ calendarEvents: response.data.activeRents })
        })
    }

    render() {
        return (
            <FullCalendar
                defaultView="dayGridMonth"
                displayEventEnd={true}
                locale="lt"
                header={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                contentHeight={800}
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: false
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={this.calendarComponentRef}
                events={this.state.calendarEvents}
                dateClick={this.handleDateClick}
                eventClick={(info) => { console.log(info.event) }}
                eventMouseEnter={(event) => { event.el.classList.add('event-hover'); }}
                eventMouseLeave={(event) => { event.el.classList.remove('event-hover'); }}
            />
        );
    }
}

export default RentCalendar;