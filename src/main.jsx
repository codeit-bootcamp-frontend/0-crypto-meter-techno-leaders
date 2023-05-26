import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '/src/App.jsx';
import { CurrencyProvider } from '/src/contexts/CurrencyContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CurrencyProvider defaultValue={'krw'}>
    <App />
  </CurrencyProvider>
);
