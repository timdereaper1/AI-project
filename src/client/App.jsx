import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot, setConfig } from 'react-hot-loader';
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

// https://github.com/gaearon/react-hot-loader/blob/master/README.md
setConfig({
	ignoreSFC: true, // RHL will be __completely__ disabled for SFC
	pureRender: true // RHL will not change render method
});

export default hot(module)(App);
