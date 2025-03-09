import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import nowego API React 18
import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // ✅ Utworzenie root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
