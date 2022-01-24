import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Button } from './components/Button';
import './services/firebase';

ReactDOM.render(
  <React.StrictMode>
    <Button />
    <Button />
    <Button />
    <Button />
  </React.StrictMode>,
  document.getElementById('root')
);
