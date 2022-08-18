import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AxiosConfigurer from './config/AxiosConfigurer';
const root = ReactDOM.createRoot(document.getElementById('root'));
AxiosConfigurer.configure();
root.render(<App />);
