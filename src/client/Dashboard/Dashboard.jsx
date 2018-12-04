import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import Sidebar from './Sidebar';
import './css/dashboard.css';
import { routes } from './routes';

class Dashboard extends React.Component<RouteComponentProps> {
	state = {};

	render(): React.ReactNode {
		const selectedRoute = routes.find(value => value.path === this.props.location.pathname);
		return (
			<div className="dashboard">
				<Sidebar links={routes} selectedPage={selectedRoute.path} />
				<div className="content-wrapper">
					<div style={{ width: '100%' }}>
						<Header className="title">{selectedRoute.name}</Header>
						<Switch>
							{routes.map((route, _i) => (
								/* eslint-disable react/no-array-index-key */
								<Route key={_i} {...route} />
							))}
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
