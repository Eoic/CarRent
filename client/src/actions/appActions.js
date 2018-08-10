import dispatcher from '../Dispatcher';
import { GLOBAL_ACTIONS } from './types';

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

export function dispatchEventOne(){
    dispatcher.dispatch({
        type: GLOBAL_ACTIONS.GENERIC_EVENT_ONE
    });
}

export function dispatchEventTwo(){
    dispatcher.dispatch({
        type: GLOBAL_ACTIONS.GENERIC_EVENT_TWO
    });
}