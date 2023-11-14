//Counter.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';

function Counter(props) {
    let [count, setCount] = useState(0)

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    return(
        <div className="container">
            <div className='d-flex justify-content-center'>
                <h3 >Counter App</h3>
            </div>
            <div className='d-flex justify-content-center'>
                <button type="button" className="btn btn-success" onClick={increment}>+</button>
                <button type="button" className="btn btn-danger" onClick={decrement}>-</button>
            </div>
            <div className='d-flex justify-content-center'>
                <h4 >Current Count: {count}</h4>
            </div>
            
        </div>
        
    );
};

export default Counter;