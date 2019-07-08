import React from 'react'
import moment from 'moment';
import Printer from './Printer';
import { Icon, Grid, Segment, Button } from 'semantic-ui-react'
import { printContract, printInvoice } from '../actions/rentActions'

const InfoField = (props) => (
    <div>
        <p style={{ float: 'left', fontWeight: 'bold' }}> {props.label} </p>
        <p style={{ float: 'right' }}> {props.value} </p>
        <div style={{ clear: 'both' }} />
    </div>
)

class RentSummary extends React.Component {
    render() {
        return (
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
                                        <InfoField label='Name' value={this.props.data.name} />
                                        <InfoField label='Surname' value={this.props.data.surname} />
                                        <InfoField label='Phone' value={this.props.data.phone || 'Not provided'} />
                                        <InfoField label='Price' value={`${this.props.data.value} €`} />
                                        <InfoField label='Address' value={this.props.data.address || 'Not provided'} />
                                        <InfoField label='Kilometers' value={this.props.data.odometer || 'Not provided'} />
                                    </Grid.Column>
                                    <Grid.Column floated='right' width={8}>
                                        <InfoField label='Start date' value={moment(this.props.data.startDate).format('YYYY/MM/DD HH:mm')} />
                                        <InfoField label='End date' value={moment(this.props.data.endDate).format('YYYY/MM/DD HH:mm')} />
                                        <InfoField label='Payment type' value={this.props.data.paymentType || 'Not set'} />
                                        <InfoField label='Duration' value={this.props.duration} />
                                        <InfoField label='Deposit' value={(this.props.data.deposit) ? "Yes" : "No"} />
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment>
                                <Button icon labelPosition='left' color='teal' onClick={this.props.resetForm}>
                                    <Icon name='pencil alternate' />
                                    Add another
                                </Button>

                                <div style={{ float: 'right' }}>
                                    <Button icon labelPosition='left' color='green' inverted onClick={() => printContract(this.props.data._id)}>
                                        <Icon name='credit card alternative' />
                                        Print contract
                                     </Button>
                                    <Button icon labelPosition='left' color='violet' inverted onClick={() => printInvoice(this.props.data._id)}>
                                        <Icon name='file pdf outline' />
                                        Print invoice
                                    </Button>
                                </div>
                                <div style={{ clear: 'both' }} />
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>
                <Printer />
            </Grid>
        )
    }
}

export default RentSummary