import * as ActionTypes from '../actiontypes';


export const increment =()=>(dispatch)=>{
    dispatch({type:ActionTypes.INCRIMENT_COUNTER})
}
export const decrement =()=>(dispatch)=>{
    dispatch({type:ActionTypes.DECRIMENT_COUNTER})
}