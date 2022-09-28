import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <NextUIProvider>
    <Router>
      <ToastContainer />
      <App />
    </Router>
  </NextUIProvider>
);
