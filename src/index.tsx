import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/SignUp";
import Dashboard from "./Dashboard/Dashboard";
import "./index.css";
import firebase from "firebase/app";
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyBc78tVw3feeCYqSwY1bJ47wCOBR76T9CI",
  authDomain: "chatapp-d79be.firebaseapp.com",
  databaseURL: "https://chatapp-d79be.firebaseio.com",
  projectId: "chatapp-d79be",
  storageBucket: "chatapp-d79be.appspot.com",
  messagingSenderId: "210308927751",
  appId: "1:210308927751:web:19efc6a9f31a7acd4335a2",
});
const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
