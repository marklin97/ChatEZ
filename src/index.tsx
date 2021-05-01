import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Styles from "./index.module.scss";
import firebase from "firebase/app";
import { Grid } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./Store/rootStore";

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
const Dashboard = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return import("./Pages/Dashboard/Dashboard");
});
const routing: JSX.Element = (
  <Provider store={store}>
    <Suspense
      fallback={
        /* <------------------------------------ **** Loading Animation START **** ------------------------------------ */
        <div>
          <div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
                container
                direction="column"
                className={Styles.loadingFormCol}
              >
                <div className={Styles.loadingPageWrapper}>
                  <div className={Styles.loadingPageTitle}>CHATEZ</div>
                  <div className={Styles.loadingAnimation}>
                    <div className={Styles.cubeGrid}>
                      <div className={Styles.loadingCube1} />
                      <div className={Styles.loadingCube2} />
                      <div className={Styles.loadingCube3} />
                      <div className={Styles.loadingCube4} />
                      <div className={Styles.loadingCube5} />
                      <div className={Styles.loadingCube6} />
                      <div className={Styles.loadingCube7} />
                      <div className={Styles.loadingCube8} />
                      <div className={Styles.loadingCube9} />
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        /* <------------------------------------ **** Loading Animation END **** ------------------------------------ */
      }
    >
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </Router>
    </Suspense>
  </Provider>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
