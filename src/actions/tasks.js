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
