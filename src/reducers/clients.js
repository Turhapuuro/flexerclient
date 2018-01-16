import * as actionTypes from '../actions/actionTypes';

const initialState = {
    clients: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CLIENTS:
            return {
                clients: action.payload,
            };
        case actionTypes.DELETE_CLIENT:
            const deletedClientId = action.payload;
            return state = {
                clients: state.clients.filter(({ id }) => (id !== deletedClientId)),
            };
        default:
            return state;
    }
};

export default reducer;
