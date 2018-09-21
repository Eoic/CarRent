import { Component } from 'react';
import { toast } from 'react-toastify';
import store from '../stores/RentStore';
import appStore from '../stores/AppStore';

class MessageQueue extends Component{
    
    componentDidMount(){
        store.addListener('rentAdded', this.displaySuccessMessage);
        appStore.addListener('requestFailed', this.displayErrorMessage);
    }

    displaySuccessMessage(message){
        toast.success(message);
    }

    displayErrorMessage(message){
        toast.error(message);
    }

    render(){
        return(null)
    }
}

export default MessageQueue;