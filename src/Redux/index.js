import { combineReducers } from "redux";
import { counterReducer } from "./Reducer/counter.reducer";
import { medicinesReducer } from "./Reducer/medicines.readucer";


export let RootReducer = combineReducers({
    counter: counterReducer,
    medicines:medicinesReducer
})