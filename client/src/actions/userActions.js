import dispatcher from '../Dispatcher';
import axios from 'axios';
import {USER_ACTIONS as USER_ACTIONS_ACTIONS, USER_ACTIONS} from './types';

const ROUTE = {
    USERS:  '/api/admin/users/',
}

/**
 * Get all users in DB
 */
export function getUsers() {
    axios.get(ROUTE.USERS).then(response => {
        dispatcher.dispatch({
            type: USER_ACTIONS.GET_USERS,
            value: response.data
        });
    });
}

/**
 * Get user by given id
 * @param { Object } id
 */
export function getUserById(id) {
    axios.get(ROUTE.USERS + id).then(response => {
        dispatcher.dispatch({
            type: USER_ACTIONS_ACTIONS.GET_USER_BY_ID,
            value: response.data
        });
    });
}