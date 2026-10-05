import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { HeroUIProvider } from "@heroui/react";
import { Provider } from 'react-redux'
import store from "../store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <Provider store={store}>

        <App />
        </Provider>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>,
);
