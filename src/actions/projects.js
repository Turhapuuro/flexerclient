import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchProjects = () => {
    return dispatch => {
        axios.get('/projects')
            .then(response => {
                dispatch({
                    type: actionTypes.FETCH_PROJECTS,
                    payload: response.data
                })
            });
    }
}