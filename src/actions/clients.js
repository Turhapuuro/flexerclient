import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchClients = () => {
    return dispatch => {
        axios.get('/clients')
            .then(response => {
                dispatch({
                    type: actionTypes.FETCH_CLIENTS,
                    payload: response.data
                })
            });
    };
};

export const deleteClient = (id) => {
    return dispatch => {
        axios.delete(`/clients/${id}`)
            .then(response => {
                dispatch({
                    type: actionTypes.DELETE_CLIENT,
                    payload: response.data
                })
            })
    }
}
