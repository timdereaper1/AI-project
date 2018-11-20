import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader';
import 'semantic-ui-css/semantic.min.css';
import { Analysis } from './Analysis';
// import App from './App';
// import HomePage from './HomePage';
// import Results from './Results';

const ReloadApp = hot(module)(Analysis);

ReactDom.render(<ReloadApp />, document.getElementById('app'));
