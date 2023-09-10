import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import movieReducer from "./reducers/MovieReducer";

import {moviesApi} from './reducers/api/MoviesApi'

const store = configureStore({
  reducer: {
    movies: movieReducer,
    
    // Add the generated reducer as a specific top-level slice
    [moviesApi.reducerPath]: moviesApi.reducer,
    
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

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
