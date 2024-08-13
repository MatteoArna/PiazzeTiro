import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './utils/i18n'; // Importa il file di configurazione i18n

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
