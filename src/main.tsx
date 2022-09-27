import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <NextUIProvider>
    <Router>
      <App />
    </Router>
  </NextUIProvider>
);
