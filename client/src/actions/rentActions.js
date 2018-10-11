import dispatcher from '../Dispatcher';
import axios from 'axios';
import { RENT_ACTIONS, GLOBAL_ACTIONS } from './types';

const ROUTE = {
    RENTS: '/api/rents'
}

/**
 * Get rents of specific type (active / reserved / ended) 
 * @param { String } RENT_TYPE  Type of rents to fetch
 * @param { Number } page       Page number of rents table
 */
export function getRents(RENT_TYPE, route, page) {
    axios.get(`${ROUTE.RENTS}/${route}`, {
        params: { page }
    }).then(response => {
        dispatcher.dispatch({
            type: RENT_TYPE,
            value: response.data
        });
    });
}

/**
 * Add new rent document
 * @param { Object } data Rent document data 
 */
export function addRent(data){
    axios.post(ROUTE.RENTS, data).then(response => {
        dispatcher.dispatch({
            type: RENT_ACTIONS.ADD_RENT,
            value: response.data
        });
    }).catch(err => {
        dispatcher.dispatch({
            type: GLOBAL_ACTIONS.REQUEST_FAILED,
            value: "Request to server failed"
        });
    });
}

/**
 * Update rent
 * @param { String } RENT_TYPE  Type of rent to update
 * @param { Object } data       New rent document data
 */
export function updateRent(RENT_TYPE, data) {
    axios.put(ROUTE.RENTS, data).then(response => {
        dispatcher.dispatch({
            type: RENT_TYPE,
            value: response.data
        });
    });
}

/**
 * Find rent by given id and update endDate to current.
 * @param { Object } id Rent document object id 
 */
export function endRent(id) {
    axios.put(`${ROUTE.RENTS}/cancel/${id}`).then(response => {
        dispatcher.dispatch({
            type: RENT_ACTIONS.END_RENT_ACTIVE,
            value: response.data
        });
    });
}

/**
 * Delete rent by given id
 * @param { Object } id Rent ObjectId
 */
export function deleteRent(RENT_TYPE, id){
    axios.delete(ROUTE.RENTS, {
        params: { id }
    }).then(response => {
        dispatcher.dispatch({
            type: RENT_TYPE,
            value: response.data
        });
    });
}

/**
 * Get info of rent with given id
 * @param { String } RENT_TYPE  Type of rent to fetch data from
 * @param { Object } id         Rent document ObjectId
 */
export function openInfoModal(RENT_TYPE, id){
    axios.get(`${ROUTE.RENTS}/${id}`).then(response => {
        dispatcher.dispatch({
            type: RENT_ACTIONS.OPEN_INFO_MODAL,
            data: response.data,
            rentType: RENT_TYPE
        });
    });
}

/**
 * Set info modal state to closed
 */
export function closeInfoModal(){
    dispatcher.dispatch({
        type: RENT_ACTIONS.CLOSE_INFO_MODAL
    });
}

/**
 * Get single rent document for invoice printing
 * @param { ObjectId } rentId Rent document id 
 */
export function printInvoice(rentId){
    axios.get(`${ROUTE.RENTS}/${rentId}`).then(response => {
        dispatcher.dispatch({
            type: RENT_ACTIONS.PRINT_INVOICE,
            data: response.data
        });
    });
}

/**
 * Get single rent document for contract printing
 * @param { ObjectId } rentId 
 */
export function printContract(rentId){
    axios.get(`${ROUTE.RENTS}/${rentId}`).then(response => {
        dispatcher.dispatch({
            type: RENT_ACTIONS.PRINT_CONTRACT,
            data: response.data
        });
    });
}

export function filterResults(filter){
    axios.post(`${ROUTE.RENTS}/filter`, filter).then(response => {
        dispatcher.dispatch({
            type: RENT_ACTIONS.FILTER_RECORDS
        }); 
    });
}