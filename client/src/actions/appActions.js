import dispatcher from '../Dispatcher';
import { GLOBAL_ACTIONS } from './types';

export function changeLanguage(languageId) {
    dispatcher.dispatch({
        type: GLOBAL_ACTIONS.CHANGE_LANGUAGE,
        value: languageId
    });
}

export function confirmAction(title, content, handleConfirm, handleCancel) {
    dispatcher.dispatch({
        type: GLOBAL_ACTIONS.CONFIRM_ACTION,
        value: {
            title,
            content,
            handleConfirm,
            handleCancel
        }
    });
}