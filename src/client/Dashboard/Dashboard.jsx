import React from 'react';
import { RouteProps, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import './css/dashboard.css';
import { routes } from './routes';

class Dashboard extends React.Component<RouteProps> {
	state = {};

	render(): React.ReactNode {
		return (
			<div className="dashboard">
				{this.renderSideBar()}
				{this.renderContent()}
			</div>
		);
	}

	renderContent = () => {
		return (
			<Switch>
				{routes.map((route, _i) => (
					/* eslint-disable react/no-array-index-key */
					<Route key={_i} {...route} />
				))}
			</Switch>
		);
	};

	renderSideBar = () => {
		return <Sidebar />;
	};
}

export default Dashboard;
