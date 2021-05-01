import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";

// create sage middleware
const sagaMiddleware = createSagaMiddleware();

// apply saga middle ware and reducer

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

//import the root saga and run this saga
sagaMiddleware.run(rootSaga);

export default store;
