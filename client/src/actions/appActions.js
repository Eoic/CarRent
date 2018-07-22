import dispatcher from '../Dispatcher';
import { GLOBAL_ACTIONS } from './types';
import axios from 'axios';

// -- Authentication --
 
export function login(userData){
    axios.post('/api/users/login', userData).then(response => {
        dispatcher.dispatch({
            type: GLOBAL_ACTIONS.LOGIN,
            errors: (typeof response.data.errors !== 'undefined') ? response.data.errors : [] 
        });
    }).catch(err => console.log(err.response));
}

export function register(userData){
    axios.post('/api/users/register', userData).then(response => {
        dispatcher.dispatch({
            type: GLOBAL_ACTIONS.REGISTER,
            errors: (typeof response.data.errors !== 'undefined') ? response.data.errors : []
        });
    }).catch(err => console.log(err));
}

// ---------------------

export function changeColorScheme(colorValue){
    dispatcher.dispatch({
        type: GLOBAL_ACTIONS.COLOR_SCHEME_CHANGE,
        value: colorValue
    });
}

export function changeFontSize(fontValue){
    dispatcher.dispatch({
        type: GLOBAL_ACTIONS.FONT_SIZE_CHANGE,
        value: fontValue
    });
}