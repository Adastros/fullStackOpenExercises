import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const onGood = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const onOk = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const onBad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const onReset = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={onGood}>good</button>
      <button onClick={onOk}>ok</button>
      <button onClick={onBad}>bad</button>
      <button onClick={onReset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
