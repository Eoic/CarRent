import dispatcher from '../Dispatcher';
import axios from 'axios';

export const CAR_ACTIONS = {
    ADD_CAR: 'carActions.AddCar',
    UPDATE_CAR: 'carActions.UpdateCar',
    DELETE_CAR: 'carActions.DeleteCar',
    GET_CARS: 'carActions.GetCars'
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
    })
}