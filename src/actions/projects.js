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

export const editProject = (project) => {
    return dispatch => {
        axios.put(`/projects/${project.id}/`, (project))
            .then(response => {
                dispatch({
                    type: actionTypes.EDIT_PROJECT,
                    payload: response.data
                })
            });
    }
}

export const deleteProject = (id) => {
    return dispatch => {
        axios.delete(`/projects/${id}`)
            .then(response => {
                dispatch({
                    type: actionTypes.DELETE_PROJECT,
                    payload: response.data
                })
            })
    }
}
