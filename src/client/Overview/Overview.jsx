import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './css/overview.css';

class Overview extends React.Component<RouteComponentProps> {
	state = {};

	render(): React.ReactNode {
		return <div className="overview">Overview</div>;
	}
}

export default Overview;
