import React from 'react';
import { Sidebar, Dimmer } from 'semantic-ui-react';
import './css/overview.css';
import { data } from './_data/list.json';
import { OverviewList } from './OverviewList';
import model from './_data/model.json';
import PerformanceChart from './PerformanceChart';
import { Overall, Essay, Performance } from './_helpers';

type State = {
	data: null | Array<Essay>,
	perf: null | Array<Performance>,
	showSidePane: boolean
};

class Overview extends React.Component<{}, State> {
	state = {
		data: null,
		perf: null,
		showSidePane: false
	};

	componentWillMount() {
		const perf = Array(2)
			.fill(0)
			.map((val, index) => {
				const name = ['examiner', 'predict'][index];
				const values = model.map(_v => _v[name]);
				return { name, data: values };
			});
		this.setState({
			data,
			perf
		});
	}

	render() {
		return (
			<Sidebar.Pushable as="div">
				<Sidebar animation="push" direction="right" visible={this.state.showSidePane}>
					<div>sidebar</div>
				</Sidebar>
				<Sidebar.Pusher>
					<Dimmer.Dimmable dimmed={this.state.showSidePane}>
						<Dimmer inverted active={this.state.showSidePane}>
							hi
						</Dimmer>
					</Dimmer.Dimmable>
					<div className="ovw-wrapper">
						<PerformanceChart data={this.state.perf} />
						<section className="ovw-section">
							<OverviewList onSelect={this.onSelectItem} data={this.state.data} />
						</section>
					</div>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		);
	}

	onSelectItem = (value: Overall): void => {
		console.log(value);
	};
}

export default Overview;
