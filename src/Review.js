import React from 'react';
import Form from './Form';
import './App.css';

const Review = props => {

    const { order } = props;

    return (
        <div>
            <h2>Your order has been placed!</h2>
            <div>
               {/* <h3>Name: {order.name}</h3> */}
            </div> 
        </div>
    )
}

export default Review
