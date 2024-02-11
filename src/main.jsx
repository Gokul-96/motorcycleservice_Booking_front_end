import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { AuthProvider } from './AuthContext.jsx';

const { createRoot } = ReactDOM;

// Use createRoot instead of ReactDOM.render
const root = document.getElementById('root');
const reactRoot = createRoot(root);
reactRoot.render(
<StrictMode>
       <AuthProvider>
 <App />
 </AuthProvider>
 </StrictMode>
     
   
  
);