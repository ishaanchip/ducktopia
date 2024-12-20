import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react';
// import { Provider } from 'react-redux'
// import {legacy_createStore as createStore} from "redux"
// import allReducers from "./redux/reducers/allReducers"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {disableReactDevTools} from "@fvilers/disable-react-devtools"

//able to preserve state of rendered data (no need to fetch API over and over again)
const queryClient = new QueryClient()


if (process.env.NODE_ENV === 'production') disableReactDevTools()

// //globalizes variables
// const store =createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
       <App />
     </QueryClientProvider>
  </StrictMode>,
)
