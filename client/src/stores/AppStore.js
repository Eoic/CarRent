import dispatcher from '../Dispatcher';
import { GLOBAL_ACTIONS } from '../actions/types';
import { EventEmitter } from 'events';

class AppStore extends EventEmitter {
    constructor(){
        super();
        this.colorTheme = '';
        this.fontSize = '';
        this.errors = [];
    }

    handleActions(action){
        switch(action.type){
            case GLOBAL_ACTIONS.LOGIN: {
                if(action.errors.length > 0){
                    this.errors = action.errors;
                    this.emit('loginError');
                } else
                    this.emit('loginSuccess');
                break; 
            }
            case GLOBAL_ACTIONS.REGISTER: {
                if(action.errors.length > 0){
                    this.errors = action.errors;
                    this.emit('registrationError');
                } else
                    this.emit('registrationSuccess'); 
                break;
            }
            case GLOBAL_ACTIONS.COLOR_SCHEME_CHANGE: {
                this.colorTheme = action.value;
                this.emit('colorSchemeChanged');
                break;
            }
            case GLOBAL_ACTIONS.FONT_SIZE_CHANGE: {
                this.fontSize = action.value;
                this.emit('fontSizeChanged');
                break;
            }
            default: {}
        }
    }

    getColorScheme(){
        return this.colorTheme;
    }

    getFontSize(){
        return this.fontSize;
    }

    getErrors() {
        return this.errors;
    }
}

const appStore = new AppStore();
dispatcher.register(appStore.handleActions.bind(appStore));
export default appStore;