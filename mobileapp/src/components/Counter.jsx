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
            <div className='col-sm-12'>
                <h3 >Counter App</h3>
            </div>
            <div className='col-sm-12'>
                <button type="button" class="btn btn-success" onClick={increment}>+</button>
                <button type="button" class="btn btn-danger" onClick={decrement}>-</button>
            </div>
            <div className='col-sm-12'>
                <h4 >Current Count: {count}</h4>
            </div>
            
        </div>
        
    );
};

export default Counter;