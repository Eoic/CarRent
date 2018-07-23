import dispatcher from '../Dispatcher';
import { EventEmitter } from 'events';
import { CAR_ACTIONS, GLOBAL_ACTIONS } from '../actions/types';

class CarStore extends EventEmitter {

    constructor(){
        super();
        this.fetching = false;
        this.errorMsg = '';
        this.cars = [];
        this.costs = [];
        this.car = {};
        this.rents = [];
    }

    handleActions(action){
        switch(action.type){
            case CAR_ACTIONS.GET_CARS: {
                this.cars = action.value;
                this.emit('storeUpdated');
                break;
            }
            case CAR_ACTIONS.ADD_CAR: {
                this.emit('updateRequired');
                break;
            }
            case CAR_ACTIONS.DELETE_CAR: {
                this.emit('updateRequired');
                break;
            }
            case CAR_ACTIONS.GET_CAR_BY_ID: {
                this.car = action.value;
                this.emit('storeUpdated');
                break;
            }
            case CAR_ACTIONS.UPDATE_CAR: {
                break;
            }
            case CAR_ACTIONS.ADD_COST: {
                this.emit('updateRequired');
                break;
            }
            case CAR_ACTIONS.GET_COSTS: {
                this.costs = action.value.response;
                this.costs.sum = action.value.sum;
                this.emit('storeUpdated');
                break;
            }
            case CAR_ACTIONS.DELETE_COST: {
                this.emit('updateRequired');
                break;
            }
            case GLOBAL_ACTIONS.REQUEST_FAILED: {
                this.errorMsg = action.value.statusText;
                this.emit('requestFailed');
                break;
            }
            case CAR_ACTIONS.GET_RENTS: {
                this.rents = action.value;
                this.emit('storeUpdated');
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

    getRents(){
        return this.rents;
    }

    getErrorMsg(){
        return this.errorMsg;
    }
}

const carStore = new CarStore();
dispatcher.register(carStore.handleActions.bind(carStore));
export default carStore;