import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import statement
import './index.css';
import App from './App';

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root using createRoot
const root = createRoot(container);

// Render your app into the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);