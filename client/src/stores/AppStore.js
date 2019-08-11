import dispatcher from '../Dispatcher';
import { GLOBAL_ACTIONS } from '../actions/types';
import { EventEmitter } from 'events';

class AppStore extends EventEmitter {
    handleActions(action){
        switch(action.type){
            case GLOBAL_ACTIONS.CHANGE_LANGUAGE: {
                this.languageId = action.value;
                this.emit('languageChanged');
                break;
            }
            case GLOBAL_ACTIONS.REQUEST_FAILED: {
                this.emit('requestFailed', action.value);
                break;
            }
            case GLOBAL_ACTIONS.CONFIRM_ACTION: {
                this.confirmationData = action.value;
                this.emit('openConfirmModal');
                break;
            }
            default: {}
        }
    }

    getConfirmationData() {
        return this.confirmationData;
    }

    getColorScheme(){
        return this.colorTheme;
    }

    getFontSize(){
        return this.fontSize;
    }
}

const appStore = new AppStore();
dispatcher.register(appStore.handleActions.bind(appStore));
export default appStore;