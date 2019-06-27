import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import moment from 'moment'

import '../styles/calendar.scss';
import { Modal, Button, Header, Grid, Icon } from 'semantic-ui-react';

class RentCalendar extends Component {

    constructor() {
        super();
        this.state = {
            calendarEvents: [],
            eventInfoOpen: false,
            carRegNumber: "",
            start: "",
            end: ""
        }

        this.openInfoModal = this.openInfoModal.bind(this);
    }

    componentDidMount() {
        axios.get('/api/rents/monthly').then(response => {
            if (typeof response.data.activeRents === "undefined")
                return;

            this.setState({ calendarEvents: response.data.activeRents })
        })
    }

    openInfoModal(data) {
        this.setState({
            start: moment(data.start).format("YYYY-MM-DD HH:mm"),
            end: moment(data.end).format("YYYY-MM-DD HH:mm"),
            carRegNumber: data.title,
            eventInfoOpen: true
        });
    }

    render() {
        return (
            <>
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
                    eventClick={(info) => { this.openInfoModal(info.event); }}
                    eventMouseEnter={(event) => { event.el.classList.add('event-hover'); }}
                    eventMouseLeave={(event) => { event.el.classList.remove('event-hover'); }}
                />
                <Modal open={this.state.eventInfoOpen} onClose={() => this.setState({ eventInfoOpen: false })} size='tiny'>
                    <Header> {this.state.carRegNumber} </Header>
                    <Modal.Content>
                        <Grid divided='vertically'>
                            <Grid.Row columns={2} className="no-padding-bottom">
                                <Grid.Column> <p style={{ fontSize: 18 }} > Start date: {this.state.start} </p> </Grid.Column>
                                <Grid.Column> <p style={{ fontSize: 18 }}> End date: {this.state.end} </p> </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative icon labelPosition='left' onClick={() => { this.setState({ eventInfoOpen: false }) }}> 
                            <Icon name='close'></Icon>
                            Close 
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        );
    }
}

export default RentCalendar;