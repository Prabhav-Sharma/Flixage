import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import ContextsProvider from "./contexts/ContextsProvider";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ContextsProvider>
      <App />
    </ContextsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
