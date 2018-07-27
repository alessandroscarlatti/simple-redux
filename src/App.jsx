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

// display

function App(props) {
  return (
    <div className="App">
      <h1>Count: {props.count}</h1>
      <button onClick={props.countUp}>Count Up, {props.greetingName}</button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    countUp: countUp(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
