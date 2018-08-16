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