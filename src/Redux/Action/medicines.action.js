import { BASE_URL } from '../../Shared/baseUrl';
import * as ActionTypes from '../actiontypes';


export const getMedicines = () => (dispatch) => {
    try {

        fetch(BASE_URL + 'medicines')
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
            .catch(error => (error.message));
    } catch (error) {
        console.log(error);
    }
}
