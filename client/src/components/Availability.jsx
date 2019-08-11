import React, { Component } from 'react';
import { Segment, Table, Grid, Button, Icon, Header } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const styles = {
    label: {
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100px',
        lineHeight: 2.7
    },
    innerGrid: {
        paddingBottom: '0px'
    },
    formColumn: {
        maxWidth: '780px'
    }
}

class Availability extends Component {

    constructor() {
        super();
        this.state = {
            startDate: moment(),
            endDate: moment()
        }
    }

    render() {
        return (
            <>
                <Segment.Group>
                    <Segment color='violet' inverted>
                        <Header as='h5'> Search for available cars </Header>
                    </Segment>
                    <Segment padded>
                        <Grid padded columns='3' centered>
                            <>
                                <Grid padded style={styles.innerGrid}>
                                    <label style={styles.label}> Start Date </label>
                                    <DatePicker
                                        className='input-style'
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={30}
                                        dateFormat="YYYY/MM/DD HH:mm"
                                        timeCaption="time"
                                        locale='lt'
                                        selected={this.state.startDate}
                                        onChange={this.handleStartDateChange}
                                    />
                                </Grid>
                                <Grid padded style={styles.innerGrid}>
                                    <label style={styles.label}> End Date </label>
                                    <DatePicker
                                        className='input-style'
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        locale='lt'
                                        timeIntervals={30}
                                        dateFormat="YYYY/MM/DD HH:mm"
                                        timeCaption="time"
                                        selected={this.state.endDate}
                                        onChange={this.handleEndDateChange}
                                    />
                                </Grid>
                                <Grid padded style={styles.innerGrid}>
                                    <Button icon labelPosition='left' color='green'>
                                        <Icon name='search' /> Search
                                    </Button>
                                </Grid>
                            </>
                        </Grid>
                    </Segment>
                </Segment.Group>

                <Table stackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> Registration nr. </Table.HeaderCell>
                            <Table.HeaderCell> Model </Table.HeaderCell>
                            <Table.HeaderCell> Color </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </>
        );
    }
}

export default Availability;