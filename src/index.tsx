import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";

import App from "./App";
import reducer from "./redux/reducers";
import database from "./redux/middlewares/database";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [database];
if (process.env.NODE_ENV !== "production") {
  middlewares.push(require("redux-immutable-state-invariant").default());
}

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
