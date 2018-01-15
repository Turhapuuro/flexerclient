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
        case actionTypes.EDIT_PROJECT:
            const editedProject = action.payload;
            return state = {
                projects: state.projects.map((project) => (project.id === editedProject.id ? editedProject : project)),
            };
        case actionTypes.DELETE_PROJECT:
            const deletedProjectId = action.payload;
            return state = {
                projects: state.projects.filter(({ id }) => (id !== deletedProjectId)),
            };
        default:
            return state;
    }
};

export default reducer;
