import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routes } from './routes';
import store from './_shared/redux';

/* eslint-disable react/prefer-stateless-function */
class App extends Component<{}, void> {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						{routes.map((route, _i) => (
							/* eslint-disable-next-line react/no-array-index-key */
							<Route key={_i} {...route} />
						))}
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default hot(module)(App);
