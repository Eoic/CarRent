import React, { Component } from 'react'
import { Icon, Grid, Segment, Button } from 'semantic-ui-react'
import moment from 'moment';

const InfoField = (props) => (
    <div>
        <p style={{ float: 'left', fontWeight: 'bold' }}> {props.label} </p>
        <p style={{ float: 'right' }}> {props.value} </p>
        <div style={{ clear: 'both' }} />
    </div>
)

const RentSummary = (props) => (
    <Grid padded centered columns='1'>
        <Grid.Row>
            <Grid.Column width='8'>
                <Segment.Group>
                    <Segment style={{ fontSize: 25, backgroundColor: '#f8f8f9' }}>
                        <Icon name='check circle outline' color='green' size='large' />
                        <p style={{ display: 'inline' }}> RENT ADDED </p>
                    </Segment>
                    <Segment>
                        <Grid divided>
                            <Grid.Column floated='left' width={8}>
                                <InfoField label='Name' value={props.data.firstName} />
                                <InfoField label='Surname' value={props.data.lastName} />
                                <InfoField label='Phone' value={props.data.phone} />
                                <InfoField label='Price' value={props.data.price} />
                                <InfoField label='Address' value={props.data.address} />
                                <InfoField label='Kilometers' value={props.data.odometer} />
                            </Grid.Column>
                            <Grid.Column floated='right' width={8}>
                                <InfoField label='Start date' value={props.data.startDate.format('YYYY/MM/DD HH:mm')} />
                                <InfoField label='End date' value={props.data.endDate.format('YYYY/MM/DD HH:mm')} />
                                <InfoField label='Payment type' value={props.data.payment.text} />
                                <InfoField label='Duration' value={`${Math.floor((props.data.duration / 60) / 24)} days ${Math.floor((props.data.duration / 60) % 24)} h. ${props.data.duration % 60} min. `} />
                                <InfoField label='Deposit' value={(props.data.deposit) ? "Yes" : "No"} />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment>
                        <Button icon labelPosition='left' color='teal' onClick={props.resetForm}>
                            <Icon name='pencil alternate' />
                            Add another
                        </Button>
                    </Segment>
                </Segment.Group>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default RentSummary