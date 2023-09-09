import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import movieReducer from "./reducers/MovieReducer";

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
