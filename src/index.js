import React, { StrictMode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "bootstrap-social/bootstrap-social.css";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
