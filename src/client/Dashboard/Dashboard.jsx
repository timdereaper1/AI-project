import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import Sidebar from './Sidebar';
import './css/dashboard.css';
import { routes } from './routes';

class Dashboard extends React.Component<RouteComponentProps> {
	state = {
		collapse: true
	};

	render(): React.ReactNode {
		const selectedRoute = routes.find(value => value.path === this.props.location.pathname);
		return (
			<div className={this.state.collapse ? 'dashboard expand' : 'dashboard'}>
				<Sidebar
					onCollapse={this.handleSideBarCollapse}
					links={routes}
					selectedPage={selectedRoute.path}
					collapse={this.state.collapse}
				/>
				<div className="content-wrapper">
					<div className="header-wrapper">
						<Header className="title" inverted>
							<div style={{ flex: 1 }}>
								{selectedRoute.name}
								<Header.Subheader>{selectedRoute.desc}</Header.Subheader>
							</div>
							<div className="details">
								<span>Welcome,</span> AI-project
							</div>
						</Header>
					</div>
					<div style={{ flex: 1, position: 'relative' }}>
						<main className="main-content">
							<Switch>
								{routes.map((route, _i) => (
									/* eslint-disable react/no-array-index-key */
									<Route key={_i} {...route} />
								))}
							</Switch>
						</main>
					</div>
				</div>
			</div>
		);
	}

	handleSideBarCollapse = (): void => {
		this.setState({
			collapse: !this.state.collapse
		});
	};
}

export default Dashboard;
