import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './AuthContext';

// Import createRoot from "react-dom/client"
const { createRoot } = ReactDOM;

// Use createRoot instead of ReactDOM.render
const root = document.getElementById('root');
const reactRoot = createRoot(root);
reactRoot.render(
    <AuthProvider>
      <App />
    </AuthProvider>
  
);