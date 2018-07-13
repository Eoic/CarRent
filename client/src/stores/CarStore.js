import dispatcher from '../Dispatcher';
import { EventEmitter } from 'events';
import * as CarActions from '../actions/carActions';
import axios from 'axios';

class CarStore extends EventEmitter {

    constructor(){
        super();
        this.cars = [];
        this.costs = [];
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
                    this.emit('updateRequired');
                });
                break;
            }
            case CarActions.CAR_ACTIONS.DELETE_CAR: {
                axios.delete(`/api/cars/${action.value}`).then(response => {
                    console.log('DELETE action received');
                }).then(response => {
                    this.emit('updateRequired');
                });
                break;
            }
            case CarActions.CAR_ACTIONS.GET_CAR_BY_ID: {
                this.car = action.value;
                this.emit('storeUpdated');
                break;
            }
            case CarActions.CAR_ACTIONS.UPDATE_CAR: {
                // TODO: Check response.
                break;
            }
            case CarActions.CAR_ACTIONS.GET_COSTS: {
                console.log('GET_COST received');
                this.costs = action.value;
                this.emit('storeUpdated');
                break;
            }
            case CarActions.CAR_ACTIONS.DELETE_COST: {
                this.emit('updateRequired');
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

    getCosts(){
        return this.costs;
    }
}

const carStore = new CarStore();
dispatcher.register(carStore.handleActions.bind(carStore));
export default carStore;