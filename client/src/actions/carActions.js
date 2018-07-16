import dispatcher from '../Dispatcher';
import axios from 'axios';

const ROUTE = {
    CARS: '/api/cars/',
    EXPENSES: '/api/expenses/'
}

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
    axios.get(ROUTE.CARS).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_CARS,
            value: response.data
        });
    });
}

export function getCarById(id){
    axios.get(ROUTE.CARS + id).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_CAR_BY_ID,
            value: response.data
        });
    });
}

export function updateCar(data){
    axios.put(ROUTE.CARS, data).then(response => {
        //console.log(response);
    }).catch(err => console.log(err));
}

export function getCosts(carId){
    axios.get(ROUTE.EXPENSES + carId).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.GET_COSTS,
            value: response.data
        });
    }).catch(err => console.log(err));
}

export function addCost(data){
    axios.post(ROUTE.EXPENSES, data).then(response => {
        console.log("Dispatching action with data: ");
        console.log(data);
        
        dispatcher.dispatch({
            type: CAR_ACTIONS.ADD_COST
        });
    }).catch(err => console.log(err));
}

export function deleteCost(id){
    axios.delete(ROUTE.EXPENSES + id).then(response => {
        dispatcher.dispatch({
            type: CAR_ACTIONS.DELETE_COST,
            value: response.data
        });
    });
}