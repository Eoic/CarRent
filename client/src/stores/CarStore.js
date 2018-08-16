import dispatcher from '../Dispatcher';
import { EventEmitter } from 'events';
import { CAR_ACTIONS } from '../actions/types';

class CarStore extends EventEmitter {

    constructor(){
        super();
        this.cars = [];
        this.costs = [];
        this.car = {};
        this.rent = {};
        this.turnover = {};
        this.carIncome = {};
        this.rentModalInfo = {
            open: false,
            data: {}
        };
        this.rents = {
            rents: [],
            size: 0
        };
        this.reservedRents = {
            rents: [],
            size: 0
        };
        this.endedRents = {
            rents: [],
            size: 0
        }
    }

    handleActions(action){
        switch(action.type){
            case CAR_ACTIONS.GET_CARS: {
                this.cars = action.value;
                this.emit('storeUpdated');
                break;
            }
            case CAR_ACTIONS.GET_CAR_BY_ID: {
                this.car = action.value;
                this.emit('storeUpdated');
                break;
            }
            case CAR_ACTIONS.GET_COSTS: {
                this.costs = action.value.response;
                this.costs.sum = action.value.sum;
                this.emit('storeUpdated');
                break;
            }
            case CAR_ACTIONS.GET_RENTS: {
                this.rents = action.value;
                this.emit('storeUpdatedActive');
                break;
            }
            case CAR_ACTIONS.GET_RESERVED_RENTS: {
                this.reservedRents = action.value;
                this.emit('storeUpdated');
                break;
            }
            case CAR_ACTIONS.GET_ENDED_RENTS: {
                this.endedRents = action.value;
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
            case CAR_ACTIONS.END_RENT:
            case CAR_ACTIONS.DELETE_RENT:
            case CAR_ACTIONS.UPDATE_RENT:
            case CAR_ACTIONS.ADD_COST:      
            case CAR_ACTIONS.DELETE_COST:
            case CAR_ACTIONS.ADD_CAR:
            case CAR_ACTIONS.DELETE_CAR: {
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

    getRentById(){
        return this.rent;
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

    getRents(){
        return this.rents;
    }

    getReservedRents(){
        return this.reservedRents;
    }

    getEndedRents(){
        return this.endedRents;
    }
}

const carStore = new CarStore();
dispatcher.register(carStore.handleActions.bind(carStore));
export default carStore;