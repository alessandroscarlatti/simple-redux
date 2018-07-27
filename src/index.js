import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";

import "./styles.css";

// the idea here is to create a really simple react-redux app...

function appReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "COUNT_UP":
      return {
        count: state.count + action.increment
      };
    default:
      console.log("returning default state", state);
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(applyMiddleware()));

function countUp() {
  store.dispatch({
    type: "COUNT_UP",
    increment: 1
  });
}

function App(props) {
  return (
    <div className="App">
      <h1>Count: {props.store.count}</h1>
      <button onClick={countUp}>Count Up</button>
    </div>
  );
}

const rootElement = document.getElementById("root");

function render() {
  ReactDOM.render(<App store={store.getState()} />, rootElement);
}

store.subscribe(render);
render();
