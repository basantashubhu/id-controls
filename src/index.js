import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/bootstrap.scss'
import './index.css';
import 'bootstrap/dist/js/bootstrap.min'
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);