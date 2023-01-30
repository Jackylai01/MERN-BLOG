import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContexProvider } from "./context/authContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContexProvider>
      <App />
    </AuthContexProvider>
  </React.StrictMode>
);
