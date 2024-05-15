import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import Router from './utils/router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={Router}>
      <App />
    </RouterProvider>
);
reportWebVitals();
