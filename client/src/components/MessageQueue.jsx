import { Component } from 'react';
import { toast } from 'react-toastify';
import appStore from '../stores/AppStore';

class MessageQueue extends Component{
    
    componentDidMount(){

        appStore.addListener('requestFailed', this.displayErrorMessage);
    }

    displayErrorMessage(message){
        toast.error(message);
    }

    render(){
        return(null)
    }
}

export default MessageQueue;