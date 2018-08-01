import dispatcher from '../Dispatcher';
import axios from 'axios';
import {
    CAR_ACTIONS,
    GLOBAL_ACTIONS
} from './types';

const ROUTE = {
    CARS: '/api/cars/',
    EXPENSES: '/api/expenses/',
    RENTS: '/api/rents/',
    TURNOVER: '/api/turnover/'
}

function dispatchError(error) {
    dispatcher.dispatch({
        type: GLOBAL_ACTIONS.REQUEST_FAILED,
        value: {
            status: error.status,
            statusText: error.data
        }
    });
}

// CARS

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

// COSTS.

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

// RENTS.

export function getRentById(id) {
    axios.get(ROUTE.RENTS + id).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_RENT_BY_ID,
            value: response.data
        });
    });
}

export function getRents(pageNumber) {
    axios.get(ROUTE.RENTS, {
        params: {
            page: pageNumber
        }
    }).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_RENTS,
            value: response.data
        });
    });
}

export function addRent(data) {
    axios.post(ROUTE.RENTS, data).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.ADD_RENT,
            value: response.data
        });
    });
}

export function getTurnover() {
    axios.get(ROUTE.TURNOVER).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.CASH_TURNOVER,
            value: response.data
        });
    });
}

export function carRentIncome(carId) {
    axios.get(ROUTE.RENTS + 'income/' + carId).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.CAR_RENT_INCOME,
            value: response.data.sum
        });
    });
}

export function endRent(id) {
    axios.put(ROUTE.RENTS + 'cancel/' + id).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.END_RENT,
            value: response.data
        });
    }).catch(err => console.log(err));
}