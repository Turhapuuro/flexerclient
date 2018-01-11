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
