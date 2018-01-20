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
        case actionTypes.ADD_CLIENT:
            const newClient = action.payload;
            return state = {
                clients: state.clients.concat(newClient),
            };
        case actionTypes.EDIT_CLIENT:
            const editedClient = action.payload;
            return state = {
                clients: state.clients.map((client) => (client.id === editedClient.id ? editedClient : client)),
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
