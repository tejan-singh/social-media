import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { makeServer } from "./server";
import { AppProvider, AppContext } from "./Context/AppContext";
import { AuthContext, AuthProvider } from "./Context/AuthContext";

makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

export { AppContext, AuthContext };
