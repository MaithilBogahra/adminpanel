import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../Redux/Action/counter.action';

function Counter(props) {
    const dispatch = useDispatch();
    const c = useSelector(state => state.counter)

    const handleIncrement=()=>{
        dispatch(increment())
    }

    const handleDecrement=()=>{
        dispatch(decrement())
    }

    return (
        <>
        <button onClick={()=>handleIncrement()}>+</button>
        <p>
            {c.counter}
        </p>
        <button onClick={()=>handleDecrement()}>-</button>
        </>
    );
}

export default Counter;

