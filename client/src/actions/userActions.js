import dispatcher from '../Dispatcher';
import axios from 'axios';
import { USER_ACTIONS} from './types';

const ROUTE = {
    USERS:  '/api/admin/users/',
    USER_VERIFICATION: '/api/admin/user/verification/',
    USER_TYPE: '/api/admin/user/type/'
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
            type: USER_ACTIONS.GET_USER_BY_ID,
            value: response.data
        });
    });
}

/**
 * Turn user account verification on or off
 * @param id
 */
export function switchUserVerification(id) {
    axios.patch(ROUTE.USER_VERIFICATION + id).then(response => {
        dispatcher.dispatch({
            type: USER_ACTIONS.SWITCH_USER_VERIFICATION,
            value: response.data
        })
    })
}

/**
 * Switch user type from normal user to admin and other way around.
 * @param id
 */
export function switchUserType(id) {
    axios.patch(ROUTE.USER_TYPE + id).then(response => {
        dispatcher.dispatch({
            type: USER_ACTIONS.SWITCH_USER_TYPE,
            value: response.data
        })
    })
}