import * as ActionTypes from '../actiontypes';

const initVal = {
    isLoading: false,
    medicines: [],
    error: ''
}

export const medicinesReducer = (state = initVal, action) => {
    switch (action.type) {
        case ActionTypes.GET_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicines: action.payload,
                error: ''
            }
        case ActionTypes.GET_LOADING:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionTypes.GET_ERROR:
            return {
                ...state,
                isLoading: false,
                medicines:[],
                error: action.payload
            }

        default:
            return state
    }
}