// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa el cliente de ReactDOM
import './index.css'; // Si tienes un archivo CSS global, asegúrate de que exista
import App from './App'; // Importa tu componente principal App

// Crea la raíz de React y renderiza tu aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

