import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import Counter from "./Counter";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <h1>MANAGEMENT APP</h1>
    <Counter />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
