import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import { Header, Icon, Modal, Button } from 'semantic-ui-react';
import Sidebar from './Sidebar';
import './css/dashboard.css';
import { routes } from './routes';

class Dashboard extends React.Component<RouteComponentProps> {
	state = {
		open: false
	};

	render(): React.ReactNode {
		const selectedRoute = routes.find(value => value.path === this.props.location.pathname);
		return (
			<div className="dashboard">
				<Sidebar links={routes} selectedPage={selectedRoute.path} />
				<div className="content-wrapper">
					<div style={{ width: '100%' }}>
						<Header className="title" inverted>
							{selectedRoute.name}
							<Icon
								name="info"
								size="small"
								inverted
								className="page-info-icon"
								onClick={this.openDescription}
							/>
						</Header>
						<Switch>
							{routes.map((route, _i) => (
								/* eslint-disable react/no-array-index-key */
								<Route key={_i} {...route} />
							))}
						</Switch>
					</div>
				</div>
				<Modal basic closeOnDimmerClick closeOnDocumentClick open={this.state.open}>
					<Modal.Content>{selectedRoute.info}</Modal.Content>
					<Modal.Actions>
						<Button className="borderless-btn" onClick={this.closeDescription}>
							Close
						</Button>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}

	openDescription = (): void => {
		this.setState({ open: true });
	};

	closeDescription = (): void => {
		this.setState({ open: false });
	};
}

export default Dashboard;
