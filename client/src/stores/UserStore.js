import dispatcher from '../Dispatcher';
import { EventEmitter } from 'events';
import { USER_ACTIONS } from '../actions/types';

class UserStore extends EventEmitter {

    constructor(){
        super();
        this.users = [];
        this.user = {};
    }

    handleActions(action){
        switch(action.type){
            case USER_ACTIONS.GET_USERS: {
                this.users = action.value;
                this.emit('storeUpdated');
                break;
            }
            case USER_ACTIONS.GET_USER_BY_ID: {
                this.user = action.value;
                this.emit('storeUpdated');
                break;
            }
            case USER_ACTIONS.SWITCH_USER_VERIFICATION: {
                this.emit('updateRequired')
                break;
            }
            case USER_ACTIONS.SWITCH_USER_TYPE: {
                this.emit('updateRequired')
                break;
            }
            default: {}
        }
    }

    getUsers(){
        return this.users;
    }

    getUserById(){
        return this.user;
    }
}

const userStore = new UserStore();
dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;