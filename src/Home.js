import React from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';

const Home = () => {

    const history = useHistory();
    return (
        <div className='homeContainer'>
            <header>
                <nav className='homeNav'>
                    <button className='buttons'>Home</button>
                    <button className='buttons' id='order-pizza' onClick={()=> history.push('/pizza')}>Order</button>
                </nav>
            </header>
        </div>
    )
}

export default Home
