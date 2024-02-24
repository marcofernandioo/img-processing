import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { createStyled } from '@mui/system';

const root = document.getElementById('root');
const styled_default = createStyled()
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, 
root);