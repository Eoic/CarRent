import dispatcher from '../Dispatcher';
import { RENT_ACTIONS } from '../actions/types';
import { EventEmitter } from 'events';

const EVENT_EMIT_STRING = {
    ADD_RENT_SUCCESS: 'rentAdded',
    ACTIVE_RENTS: 'storeUpdate_Active',
    RESERVED_RENTS: 'storeUpdate_Reserved',
    ENDED_RENTS: 'storeUpdate_Ended',
    UPDATE_RENT_ACTIVE: 'update_Active',
    UPDATE_RENT_RESERVED: 'update_Reserved',
    UPDATE_RENT_ENDED: 'update_Ended',
    MODAL_STATE_CHANGE: 'stateChanged',
    CALENDAR_RENTS: 'calendarRents',
    RENT_COPY_AVAILABLE: 'rentCopyAvailable'
}

class RentStore extends EventEmitter {
    constructor() {
        super();

        this.activeRents = {
            activeRents: [],
            size: 0
        };

        this.reservedRents = {
            reservedRents: [],
            size: 0
        };

        this.endedRents = {
            endedRents: [],
            size: 0
        };

        this.rentModalInfo = {
            open: false,
            data: {},
            rentType: ''
        };

        this.calendarRents = [];
        this.rent = {};
        this.rentCopy = {};
    }

    handleActions(action) {
        switch (action.type) {

            // POST
            case RENT_ACTIONS.ADD_RENT: {
                this.rent = action.value; // Cache added rent info.
                this.emit(EVENT_EMIT_STRING.ADD_RENT_SUCCESS, "Rent added successfully");
                break;
            }

            // GET
            case RENT_ACTIONS.GET_ACTIVE_RENTS: {
                this.activeRents = action.value;
                this.emit(EVENT_EMIT_STRING.ACTIVE_RENTS);
                break;
            }

            case RENT_ACTIONS.GET_RESERVED_RENTS: {
                this.reservedRents = action.value;
                this.emit(EVENT_EMIT_STRING.RESERVED_RENTS);
                break;
            }

            case RENT_ACTIONS.GET_ENDED_RENTS: {
                this.endedRents = action.value;
                this.emit(EVENT_EMIT_STRING.ENDED_RENTS);
                break;
            }

            case RENT_ACTIONS.GET_CALENDAR_RENTS: {
                this.calendarRents = action.data;
                this.emit(EVENT_EMIT_STRING.CALENDAR_RENTS);
                break;
            }

            case RENT_ACTIONS.GET_RENT_COPY: {
                this.rentCopy = action.value;
                this.emit(EVENT_EMIT_STRING.RENT_COPY_AVAILABLE);
                break;
            }

            // UPDATE
            case RENT_ACTIONS.UPDATE_ACTIVE_RENT: {
                this.emit(EVENT_EMIT_STRING.UPDATE_RENT_ACTIVE);
                break;
            }

            case RENT_ACTIONS.UPDATE_RESERVED_RENT: {
                this.emit(EVENT_EMIT_STRING.UPDATE_RENT_RESERVED);
                break;
            }

            case RENT_ACTIONS.UPDATE_ENDED_RENT: {
                this.emit(EVENT_EMIT_STRING.UPDATE_RENT_ENDED);
                break;
            }

            // DELETE
            case RENT_ACTIONS.DELETE_ACTIVE_RENT: {
                this.emit(EVENT_EMIT_STRING.UPDATE_RENT_ACTIVE);
                break;
            }

            case RENT_ACTIONS.DELETE_RESERVED_RENT: {
                this.emit(EVENT_EMIT_STRING.UPDATE_RENT_RESERVED);
                break;
            }

            case RENT_ACTIONS.DELETE_ENDED_RENT: {
                this.emit(EVENT_EMIT_STRING.UPDATE_RENT_ENDED);
                break;
            }

            // END
            case RENT_ACTIONS.END_RENT_ACTIVE: {
                this.emit(EVENT_EMIT_STRING.UPDATE_RENT_ACTIVE);
                this.emit(EVENT_EMIT_STRING.UPDATE_RENT_ENDED);
                break;
            }

            // TOGGLE INFO
            case RENT_ACTIONS.OPEN_INFO_MODAL: {
                this.rentModalInfo = {
                    open: true,
                    data: action.data,
                    rentType: action.rentType
                }
                this.emit(EVENT_EMIT_STRING.MODAL_STATE_CHANGE);
                break;
            }

            case RENT_ACTIONS.CLOSE_INFO_MODAL: {
                this.rentModalInfo = {
                    open: false,
                    data: {}
                }
                this.emit(EVENT_EMIT_STRING.MODAL_STATE_CHANGE);
                break;
            }

            // PRINT DOCUMENTS
            case RENT_ACTIONS.PRINT_INVOICE: {
                this.rent = action.data;
                this.emit('printInvoice');
                break;
            }

            case RENT_ACTIONS.PRINT_CONTRACT: {
                this.rent = action.data;
                this.emit('printContract');
                break;
            }

            default: { }
        }
    }

    getActiveRents() {
        return this.activeRents;
    }

    getReservedRents() {
        return this.reservedRents;
    }

    getEndedRents() {
        return this.endedRents;
    }

    getInfoModalState() {
        return this.rentModalInfo;
    }

    getRent() {
        return this.rent;
    }

    getRentCopy() {
        return this.rentCopy;
    }

    flushRentCopy() {
        this.rentCopy = {};
    }

    getCalendarRents() {
        return this.calendarRents;
    }
}

const rentStore = new RentStore();
dispatcher.register(rentStore.handleActions.bind(rentStore));
export default rentStore;