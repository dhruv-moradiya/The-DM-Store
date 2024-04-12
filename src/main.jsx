import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClothContextProvider } from "./context/ClothContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClothContextProvider>
    <App />
  </ClothContextProvider>
);
