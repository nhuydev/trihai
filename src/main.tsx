import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <NextUIProvider>
    <App />
  </NextUIProvider>
);
