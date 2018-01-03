import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TASKS:
            return state = {
                ...state,
                tasks: action.payload
            };
        case actionTypes.DELETE_TASK:
            return state = {
                ...state,
                tasks: action.payload
            };
        default:
            return state;
    }
}

export default reducer;