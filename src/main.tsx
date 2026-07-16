import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

const params = new URLSearchParams(window.location.search);
const appMode = params.get('app') === '1';
const rootPath = window.location.pathname === '/' || window.location.pathname === '/Rekova-Recovery/';

if (rootPath && !appMode) {
  const landingPath = window.location.pathname.endsWith('/Rekova-Recovery/')
    ? '/Rekova-Recovery/landing'
    : '/landing';
  window.location.replace(landingPath);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
