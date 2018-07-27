import React from "react";
import { connect } from "react-redux";

// state

const defaultState = {
  count: 0
};

export function appReducer(state = defaultState, action) {
  switch (action.type) {
    case "COUNT_UP":
      return {
        count: state.count + action.increment
      };
    case "RESET_COUNT":
      return {
        count: action.number
      };
    default:
      console.log("returning default state", state);
      return state;
  }
}

// behaviors

function countUp(dispatch) {
  return () => {
    dispatch({
      type: "COUNT_UP",
      increment: 1
    });
  };
}

function getNewNumber(dispatch) {
  let action = () => {
    dispatch({
      type: "RESET_COUNT",
      number: Math.floor(Math.random() * 10)
    });
  };

  return function() {
    window.setTimeout(action, 1000);
  };
}

// should first reset to 0 while waiting...
function getNewHugeNumberThunk() {
  return function(dispatch, getState) {
    let waitingNumber = getState().count + 1000;
    dispatch({
      type: "RESET_COUNT",
      number: waitingNumber
    });

    let action = () => {
      dispatch({
        type: "RESET_COUNT",
        number: Math.floor(Math.random() * 100) + 100
      });
    };

    window.setTimeout(action, 1000);
  };
}

function getNewHugeNumber(dispatch) {
  return function() {
    dispatch(getNewHugeNumberThunk());
  };
}

// display

function App(props) {
  return (
    <div className="App">
      <h1>Count: {props.count}</h1>
      <button onClick={props.countUp}>Count Up, {props.greetingName}</button>
      <button onClick={props.getNewNumber}>Get a New Number</button>
      <button onClick={props.getNewHugeNumber}>Get a New Huge Number</button>
    </div>
  );
}

// bind display, state, and behavior

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    countUp: countUp(dispatch),
    getNewNumber: getNewNumber(dispatch),
    getNewHugeNumber: getNewHugeNumber(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
