import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import './css/dashboard.css';
import { routes } from './routes';

class Dashboard extends React.Component<RouteComponentProps> {
	state = {};

	render(): React.ReactNode {
		return (
			<div className="dashboard">
				<Sidebar links={routes} selectedPage={this.props.location.pathname} />
				<Switch>
					{routes.map((route, _i) => (
						/* eslint-disable react/no-array-index-key */
						<Route key={_i} {...route} />
					))}
				</Switch>
			</div>
		);
	}
}

export default Dashboard;
