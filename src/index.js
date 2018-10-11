import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import 'react-awesome-button/dist/themes/theme-blue.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
