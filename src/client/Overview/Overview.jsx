import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './css/overview.css';
import { data } from './_data/list.json';
import { OverviewList } from './OverviewList';

class Overview extends React.Component<RouteComponentProps> {
	state = {
		data: null
	};

	componentWillMount() {
		this.setState({
			data
		});
	}

	render(): React.ReactNode {
		return (
			<div className="ovw-wrapper">
				<OverviewList onSelect={this.onSelectItem} data={this.state.data} />
			</div>
		);
	}
}

export default Overview;
