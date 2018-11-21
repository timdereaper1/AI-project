import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routes } from './routes';

class App extends Component<{}> {
	state = {};

	render(): React.ReactNode {
		return (
			<BrowserRouter>
				<Switch>
					{routes.map((route, _i) => (
						/* eslint-disable-next-line react/no-array-index-key */
						<Route key={_i} {...route} />
					))}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default hot(module)(App);
