import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchTasks = () => {
    return dispatch => {
        axios.get('/tasks')
            .then(response => {
                dispatch({
                    type: actionTypes.FETCH_TASKS,
                    payload: response.data
                })
        });
    }  
}

export const deleteTask = (id) => {
    return dispatch => {
        axios.delete('/tasksdel/', {id:id})
            .then(response => {
                dispatch({
                    type: actionTypes.DELETE_TASK,
                    payload: response.data
                })
            })
    }
}
