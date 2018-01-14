import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchProjects = () => {
    return dispatch => {
        axios.get('/projects')
            .then(response => {
                console.log(response.data);
                dispatch({
                    type: actionTypes.FETCH_PROJECTS,
                    payload: response.data
                })
            });
    }
};

export const addProject = (project) => {
    return dispatch => {
        axios.post('/projects/', (project))
            .then(response => {
                dispatch({
                    type: actionTypes.ADD_PROJECT,
                    payload: response.data
                })
            });
    }
}
