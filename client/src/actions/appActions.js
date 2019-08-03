import dispatcher from '../Dispatcher';
import { GLOBAL_ACTIONS } from './types';

export function changeLanguage(languageId){
    dispatcher.dispatch({
        type: GLOBAL_ACTIONS.CHANGE_LANGUAGE,
        value: languageId
    });
}