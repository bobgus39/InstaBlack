import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
