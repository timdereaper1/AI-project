import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

const ReloadApp = hot(module)(App);

ReactDom.render(<ReloadApp />, document.getElementById('app'));
