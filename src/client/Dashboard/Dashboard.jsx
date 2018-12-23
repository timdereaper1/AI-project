import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import Sidebar from './Sidebar';
import './css/dashboard.css';
import { routes } from './routes';
import { setSchemeState } from '../_shared/redux/actions';
import { AppFooter } from '../_shared/components';

interface Props {
	setSchemeState: Function;
	location: any;
}

interface State {
	collapse: boolean;
}

class Dashboard extends React.Component<Props, State> {
	state = {
		collapse: true
	};

	static propTypes = {
		setSchemeState: PropTypes.func.isRequired
	};

	componentWillMount() {
		this.props.setSchemeState();
	}

	render() {
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
					<AppFooter />
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

export default connect(
	null,
	{ setSchemeState }
)(Dashboard);
