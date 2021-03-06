import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: [],
    overviewTasks: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TASKS:
            return state = {
                ...state,
                tasks: action.payload,
            };
        case actionTypes.ADD_TASK:
            const newTask = action.payload;
            return state = {
                ...state,
                tasks: state.tasks.concat(newTask),
            };
        case actionTypes.EDIT_TASK:
            const editedTask = action.payload;
            return state = {
                ...state,
                tasks: state.tasks.map((task) => (task.task_id === editedTask.task_id ? editedTask : task)),
            };
        case actionTypes.DELETE_TASK:
            const deletedTaskId = action.payload;
            return state = {
                ...state,
                tasks: state.tasks.filter(({ task_id }) => (task_id !== deletedTaskId)),
            };
        case actionTypes.FETCH_TASK_OVERVIEW_BY_MONTH:
            return state = {
                ...state,
                overviewTasks: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
