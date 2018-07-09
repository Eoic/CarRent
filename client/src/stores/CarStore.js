import dispatcher from '../Dispatcher';
import { EventEmitter } from 'events';
import * as CarActions from '../actions/carActions';
import axios from 'axios';

class AppStore extends EventEmitter {
    constructor(){
        super();
        this.state = {
            cars: []
        }
    }

    handleActions(action){
        switch(action.type){
            case CarActions.CAR_ACTIONS.GET_CARS: {
                axios.get('/api/cars').then(response => {
                    const cars = response.data;
                    this.setState({ cars });
                    this.emit('storeUpdated');
                });
                break;
            }
            case CarActions.CAR_ACTIONS.ADD_CAR: {
                axios.post('/api/cars', action.value).then(response => {
                    this.emit('storeUpdated');
                });
                break;
            }
            case CarActions.CAR_ACTIONS.DELETE_CAR: {
                axios.delete(`/api/cars/${action.value}`).then(response => {
                    this.emit('storeUpdated');
                });
                break;
            }
            default: {}
        }
    }

    getCars(){
        return this.state.cars;
    }
}

const appStore = new AppStore();
dispatcher.register(appStore.handleActions.bind(appStore));
export default appStore;