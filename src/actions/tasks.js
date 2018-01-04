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

export const addTask = (task) => {
    return dispatch => {
        axios.post('/tasks/', (task))
            .then(response => {
                dispatch({
                    type: actionTypes.ADD_TASK,
                    payload: response.data
                })
        });
    }  
}

export const editTask = (task) => {
    return dispatch => {
        axios.post(`/tasks/${task.task_id}`, (task))
            .then(response => {
                dispatch({
                    type: actionTypes.EDIT_TASK,
                    payload: response.data
                })
        });
    }  
}

export const deleteTask = (id) => {
    return dispatch => {
        axios.delete(`/tasks/${id}`)
            .then(response => {
                dispatch({
                    type: actionTypes.DELETE_TASK,
                    payload: response.data
                })
            })
    }
}
