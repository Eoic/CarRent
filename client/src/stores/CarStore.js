import dispatcher from '../Dispatcher';
import { EventEmitter } from 'events';
import { CAR_ACTIONS } from '../actions/types';

class CarStore extends EventEmitter {

    constructor(){
        super();
        this.cars = [];
        this.costs = [];
        this.car = {};
        this.turnover = {
            rentsMonthly: 0,
            rentsTotal: 0,
            expensesMonthly: 0,
            expensesTotal: 0
        };
        this.carIncome = {};
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

    getCashTurnover(){
        return this.turnover;
    }

    getCarIncome(){
        return this.carIncome;
    }
}

const carStore = new CarStore();
dispatcher.register(carStore.handleActions.bind(carStore));
export default carStore;