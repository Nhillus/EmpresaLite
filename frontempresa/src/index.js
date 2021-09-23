import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './empresa/App';
import Crearempresa from './component/crearempresa'
import reportWebVitals from './reportWebVitals';
import Editarempresa from './component/editarempresa'



ReactDOM.render(
  <React.StrictMode>
    <App />
    <Crearempresa />
    <Editarempresa/>
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
