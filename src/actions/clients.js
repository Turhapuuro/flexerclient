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

export const addClient = (client) => {
    return dispatch => {
        axios.post('/clients/', (client))
            .then(response => {
                dispatch({
                    type: actionTypes.ADD_CLIENT,
                    payload: response.data
                })
            });
    }
}

export const editClient = (client) => {
    return dispatch => {
        axios.put(`/clients/${client.id}/`, (client))
            .then(response => {
                dispatch({
                    type: actionTypes.EDIT_CLIENT,
                    payload: response.data
                })
            });
    }
}

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
