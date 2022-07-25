import { BASE_URL } from '../../Shared/baseUrl';
import * as ActionTypes from '../actiontypes';


export const getMedicines = () => (dispatch) => {
    try {
        dispatch(getLoding())
        setTimeout(function(){
            fetch(BASE_URL + 'medicine')
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then(data => dispatch(({ type: ActionTypes.GET_MEDICINES, payload: data })))
            .catch(error => dispatch(getError(error.message)));
        },2000);
       
    } catch (error) {
        dispatch(error.message);
    }
}

export const getLoding=()=>(dispatch)=>{
    dispatch({type:ActionTypes.GET_LOADING})
}
export const getError = (error) =>(dispatch)=>{
    dispatch({type:ActionTypes.GET_ERROR, payload:error})
}
