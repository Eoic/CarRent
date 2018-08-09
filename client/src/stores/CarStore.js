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
        this.rent = {};
        this.turnover = {};
        this.carIncome = {};
        this.rentModalInfo = {
            open: false,
            data: {}
        };
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
                console.log("Fetching...")
                this.rents = action.value;
                this.emit('storeUpdated');
                break;
            }
            case CAR_ACTIONS.GET_RENT_BY_ID: {
                this.rent = action.value;
                this.emit('rentInfoReceived'); 
                break;
            }
            case CAR_ACTIONS.CASH_TURNOVER: {
                this.turnover = action.value;
                this.emit('turnoverReceived');
                break;
            }
            case CAR_ACTIONS.CAR_RENT_INCOME: {
                this.carIncome = action.value;
                this.emit('incomeReceived');
                break;
            }
            case CAR_ACTIONS.END_RENT: {
                this.emit('updateRequired');
                break;
            }
            case CAR_ACTIONS.DELETE_RENT: {
                console.log("Deleting...");
                this.emit('updateRequired');
                break;
            }
            case CAR_ACTIONS.UPDATE_RENT: {
                this.emit('updateRequired');
                break;
            }
            case CAR_ACTIONS.OPEN_INFO_MODAL: {
                this.rentModalInfo = {
                    open: true,
                    data: action.data
                }
                this.emit('stateChanged');
                break;
            }
            case CAR_ACTIONS.CLOSE_INFO_MODAL: {
                this.rentModalInfo = {
                    open: false,
                    data: {}
                }
                this.emit('stateChanged');
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

    getRentById(){
        return this.rent;
    }

    getErrorMsg(){
        return this.errorMsg;
    }

    getCashTurnover(){
        return this.turnover;
    }

    getCarIncome(){
        return this.carIncome;
    }

    getInfoModalState(){
        return this.rentModalInfo;
    }
}

const carStore = new CarStore();
dispatcher.register(carStore.handleActions.bind(carStore));
export default carStore;