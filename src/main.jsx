import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store.js';

// Import createRoot from "react-dom/client"
const { createRoot } = ReactDOM;

// Use createRoot instead of ReactDOM.render
const root = document.getElementById('root');
const reactRoot = createRoot(root);
reactRoot.render(
   <Provider store={store}>
 <App />
   </Provider>
     
   
  
);