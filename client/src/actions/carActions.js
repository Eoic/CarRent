import dispatcher from '../Dispatcher';
import axios from 'axios';

export const CAR_ACTIONS = {
    ADD_CAR: 'carActions.AddCar',
    UPDATE_CAR: 'carActions.UpdateCar',
    DELETE_CAR: 'carActions.DeleteCar',
    GET_CARS: 'carActions.GetCars',
    GET_CAR_BY_ID: 'carActions.GetCarById',
    GET_COSTS: 'carActions.GetCosts',
    ADD_COST: 'carActions.AddCost',
    DELETE_COST: 'carActions.DeleteCost'
};

export function addCar(carData){
    dispatcher.dispatch({
        type: CAR_ACTIONS.ADD_CAR,
        value: carData
    });
}

export function deleteCar(id){
    dispatcher.dispatch({
        type: CAR_ACTIONS.DELETE_CAR,
        value: id
    });
}

export function getCars() {
    axios.get('/api/cars').then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_CARS,
            value: response.data
        });
    });
}

export function getCarById(id){
    axios.get(`/api/cars/${id}`).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_CAR_BY_ID,
            value: response.data
        });
    });
}

export function updateCar(id, data){
    axios.put(`/api/cars/${id}`, data).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.UPDATE_CAR
        });
    });
}

export function addCost(id, data){
    axios.post(`/api/expenses`, data).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.ADD_COST
        });
    });
}

export function removeCost(id){
    axios.delete(`/api/expenses/${id}`).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.DELETE_COST
        });
    });
}