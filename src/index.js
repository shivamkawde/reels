import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Login from './Login';
// import CreateAc from "./CreateAc"


import App1 from "./App1"

ReactDOM.render(
  // <Router>
  //   <Switch>
  //      <Route path="/Login">
  //        <Login/>

  //      </Route>


  //      <Route path="/CreateAc">
  //        <CreateAc/>
  //        </Route>

  //        <Route path="/">
  //          <App/>

  //        </Route>

  //   </Switch>
  // </Router>
  
  <App1/>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

