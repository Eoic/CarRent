import dispatcher from '../Dispatcher';
import axios from 'axios';
import { CAR_ACTIONS } from './types';

const ROUTE = {
    CARS:       '/api/cars/',
    EXPENSES:   '/api/expenses/',
    RENTS:      '/api/rents/',
    TURNOVER:   '/api/turnover/'
}

/**
 * Get all cars in DB
 */
export function getCars() {
    axios.get(ROUTE.CARS).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_CARS,
            value: response.data
        });
    });
}

/**
 * Get car document by given id
 * @param { Object } id 
 */
export function getCarById(id) {
    axios.get(ROUTE.CARS + id).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_CAR_BY_ID,
            value: response.data
        });
    });
}

/**
 * Add new car document
 * @param { Object } data 
 */
export function addCar(data) {
    axios.post(ROUTE.CARS, data).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.ADD_CAR,
            value: response.data
        });
    });
}

/**
 * Update car document
 * @param { Object } data 
 */
export function updateCar(data) {
    axios.put(ROUTE.CARS, data).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.UPDATE_CAR,
            value: response.data
        })
    }).catch(err => console.log(err));
}

/**
 * Delete car by given id
 * @param { Object } id 
 */
export function deleteCar(id) {
    axios.delete(ROUTE.CARS + id).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.DELETE_CAR,
            value: response.data
        });
    });
}

/**
 * Get all cost of car with given id
 * @param { Object } carId Car id 
 */
export function getCosts(carId, page) {

    axios.get(ROUTE.EXPENSES + carId, {
        params: { page }
    }).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_COSTS,
            value: response.data
        });
    }).catch(err => console.log(err));
}

/**
 * Add new cost object for car
 * @param { Object } data Cost document info 
 */
export function addCost(data) {
    axios.post(ROUTE.EXPENSES, data).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.ADD_COST,
            value: response.data,
            status: response.status
        });
    });
}

/**
 * Delete car cost of given id
 * @param { Object } id Cost id
 */
export function deleteCost(id) {
    axios.delete(ROUTE.EXPENSES + id).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.DELETE_COST,
            value: response.data
        });
    }).catch(err => console.log(err));
}

/**
 * Get all income / expenses of current year
 */
export function getTurnover() {
    axios.get(ROUTE.TURNOVER).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.CASH_TURNOVER,
            value: response.data
        });
    });
}

/**
 * Get all profit of car with id
 * @param { Object } carId Car id
 */
export function carRentIncome(carId) {
    axios.get(`${ROUTE.RENTS}income/${carId}`).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.CAR_RENT_INCOME,
            value: response.data.sum
        });
    });
}