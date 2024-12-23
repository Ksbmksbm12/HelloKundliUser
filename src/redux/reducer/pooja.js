import * as actionTypes from '../actionTypes';
const initialState = {
    poojaData: null,
    
};
const pooja = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_POOJA_DATA:
            return {
                ...state,
                poojaData: payload,
            };

  
        default:
            return state;
    }
};

export default pooja;
