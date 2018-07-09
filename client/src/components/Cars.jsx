import React, { Component } from 'react';
import axios from 'axios';

class Cars extends Component{

    constructor(props){
        super(props);
        this.state = {
            message: null,
            fetching: true
        }
    }

    componentDidMount(){
        axios.get('/api').then(response => {
            this.setState({
                fetching: false,
                message: response.data
            });
        });
    }

    render(){
        return(
            <div>
                { this.state.fetching ? 'Fetching data from API' :  this.state.message.message }
            </div>
        );
    }
}

export default Cars;