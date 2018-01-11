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
        default:
            return state;
    }
};

export default reducer;
