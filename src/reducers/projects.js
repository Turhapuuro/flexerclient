import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROJECTS:
            return state = {
                projects: action.payload,
            };
        case actionTypes.ADD_PROJECT:
            const newProject = action.payload;
            return state = {
                projects: state.projects.concat(newProject),
            };
        default:
            return state;
    }
};

export default reducer;
