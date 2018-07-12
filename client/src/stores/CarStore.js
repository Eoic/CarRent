import dispatcher from '../Dispatcher';
import { EventEmitter } from 'events';
import * as CarActions from '../actions/carActions';
import axios from 'axios';

class CarStore extends EventEmitter {

    constructor(){
        super();
        this.cars = [];
        this.car = {};
    }

    handleActions(action){
        switch(action.type){
            case CarActions.CAR_ACTIONS.GET_CARS: {
                this.cars = action.value;
                this.emit('storeUpdated');
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
            case CarActions.CAR_ACTIONS.GET_CAR_BY_ID: {
                this.car = action.value;
                this.emit('dataReceived');
                break;
            }
            default: {}
        }
    }

    getCars(){
        return this.cars;
    }

    getCarById(){
        return this.car;
    }
}

const carStore = new CarStore();
dispatcher.register(carStore.handleActions.bind(carStore));
export default carStore;