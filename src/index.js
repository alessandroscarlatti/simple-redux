import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import App, { appReducer } from "./App.jsx";

import "./styles.css";

// the idea here is to create a really simple react-redux app...

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(applyMiddleware()));
const rootElement = document.getElementById("root");

function ReactReduxApp() {
  return (
    <Provider store={store}>
      <App greetingName={"phil"} />
    </Provider>
  );
}

function render() {
  ReactDOM.render(ReactReduxApp(), rootElement);
}

store.subscribe(render);
render();
