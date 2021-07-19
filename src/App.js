import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Form from './Form';
import Home from './Home';
import Review from "./Review";
import './App.css';

const App = () => {

  return (
    <div className='homeContainer'>
      <h1>Lambda Pizza Palooza!</h1>
      <BrowserRouter>
        <Route exact path ='/'>
          <Home/>
        </Route>
        <Route path ='/pizza'>
          <Form/>
        </Route>
        <Route path ='/review'>
          <Review/>
        </Route>
      </BrowserRouter>

    </div>
  );
};
export default App;
