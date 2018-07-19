import dispatcher from '../Dispatcher';
import axios from 'axios';
import { CAR_ACTIONS, GLOBAL_ACTIONS } from './types';

const ROUTE = {
    CARS: '/api/cars/',
    EXPENSES: '/api/expenses/'
}

function dispatchError(error){
    dispatcher.dispatch({
        type: GLOBAL_ACTIONS.REQUEST_FAILED,
        value: {
            status: error.status,
            statusText: error.data
        }
    });
}

export function getCars() {
    axios.get(ROUTE.CARS).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_CARS,
            value: response.data
        });
    });
}

export function getCarById(id) {
    axios.get(ROUTE.CARS + id).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_CAR_BY_ID,
            value: response.data
        });
    });
}

export function addCar(carData) {
    axios.post(ROUTE.CARS, carData).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.ADD_CAR,
            value: response.data
        });
    }).catch(err => console.log(err));
}

export function updateCar(data) {
    axios.put(ROUTE.CARS, data).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.UPDATE_CAR,
            value: response.data
        })
    }).catch(err => console.log(err));
}

export function deleteCar(id) {
    axios.delete(ROUTE.CARS + id).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.DELETE_CAR,
            value: response.data
        });
    });
}

export function getCosts(carId) {
    axios.get(ROUTE.EXPENSES + carId).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_COSTS,
            value: response.data
        });
    }).catch(err => console.log(err));
}

export function addCost(data) {
    axios.post(ROUTE.EXPENSES, data).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.ADD_COST,
            value: response.data,
            status: response.status
        });
    }).catch(err => dispatchError(err.response));
}

export function deleteCost(id) {
    axios.delete(ROUTE.EXPENSES + id).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.DELETE_COST,
            value: response.data
        });
    }).catch(err => console.log(err));
}