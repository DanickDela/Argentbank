/**
 * Entry point of the React application.
 *
 * This file initializes and renders the root React component tree.
 * It sets up global providers such as:
 * - Redux store (state management)
 * - React Router (client-side routing)
 * - React StrictMode (development checks)
 *
 * @module main
 */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./store/store";

/**
 * Renders the React application into the DOM.
 *
 * The application is wrapped with:
 * - {@link React.StrictMode} for highlighting potential problems in development
 * - {@link Provider} to make the Redux store available to all components
 * - {@link BrowserRouter} to enable routing
 *
 * @function renderApp
 * @returns {void}
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
