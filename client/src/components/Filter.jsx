import React, { Component } from 'react';
import { Form, Segment, Button, Grid, Divider } from 'semantic-ui-react';
import { filterResults } from '../actions/rentActions';

const Label = (props) => (
    <label style={{ width: 77 }}> {props.text} </label>
);

class Filter extends Component {

    constructor() {
        super();
        this.state = {
            filterOpen: false,
            filter: {
                startDate: '',
                endDate: '',
                dateAdded: '',
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
                income: '',
                deposit: ''
            }
        }

        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleFilter() {
        this.setState({
            filterOpen: !this.state.filterOpen
        });
    }

    handleChange(event){

        let name = event.target.name;
        let value = event.target.value;

        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [name]: value 
            }
        }));
    }

    handleSubmit(){
        filterResults(this.state.filter);
    }

    render() {
        return (
            <Segment.Group>
                    <Segment>
                        <Form onSubmit={this.handleSubmit}>
                            <Grid stackable columns={4} padded>
                                <Grid.Column>
                                    <Form.Input label={<Label text='Start Date' />} />
                                    <Form.Input label={<Label text='End Date' />} />
                                    <Form.Input label={<Label text='Date Added' />} />
                                </Grid.Column>

                                <Grid.Column>
                                    <Form.Input name='firstName' label={<Label text='First Name' />} onChange={this.handleChange} />
                                    <Form.Input name='lastName' label={<Label text='Last Name' />} onChange={this.handleChange} />
                                </Grid.Column>

                                <Grid.Column>
                                    <Form.Input name='phone' label={<Label text='Phone' />} onChange={this.handleChange} />
                                    <Form.Input name='address' label={<Label text='Address' />} onChange={this.handleChange} />
                                </Grid.Column>

                                <Grid.Column>
                                    <Form.Input name='income' label={<Label text='Income' />} onChange={this.handleChange} />
                                    <Form.Input label={<Label text='Deposit' />} />
                                </Grid.Column>
                            </Grid>
                            <Divider />
                            <Form.Button icon='search' content='Apply' color='green' />
                        </Form>
                    </Segment>
            </Segment.Group>
        );
    }
}

export default Filter;