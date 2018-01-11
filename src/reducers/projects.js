import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        default:
            return state;
    }
};

export default reducer;