import React from 'react';
import { Sidebar, Dimmer, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import result from './_data/result.json';
import pos from './_data/pos.json';
import { filterEssayResults, getPOSResultDetails } from './_helpers';
import AnalysisView from './AnalysisView';
import AnalysisDetailView from './AnalysisDetailView';

export default class Analysis extends React.Component<RouteComponentProps> {
	state = {
		pos: null,
		essay: null,
		showSidePane: false,
		list: null,
		score: 0
	};

	componentWillMount() {
		const { pos: resultPOS, essay } = filterEssayResults(result);
		const list = getPOSResultDetails(pos, resultPOS.labels, resultPOS.series);
		this.setState({
			pos: resultPOS,
			essay,
			list,
			score: result.score
		});
	}

	render(): React.ReactNode {
		return (
			<Sidebar.Pushable>
				<Sidebar
					direction="right"
					animation="push"
					width="very wide"
					visible={this.state.showSidePane}
				>
					<AnalysisDetailView
						details={this.state.list}
						onClose={this.handleSideBarClose}
					/>
				</Sidebar>
				<Sidebar.Pusher>
					<Dimmer.Dimmable dimmed={this.state.showSidePane}>
						<Dimmer
							inverted
							onClick={this.handleSideBarClose}
							active={this.state.showSidePane}
						>
							<Header as="h2" icon inverted style={{ color: 'black' }}>
								Side Bar
							</Header>
						</Dimmer>
						<AnalysisView
							{...this.props}
							pos={this.state.pos}
							essay={this.state.essay}
							onSideBarView={this.handleSideBar}
							details={this.state.list}
							score={this.state.score}
						/>
					</Dimmer.Dimmable>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		);
	}

	handleSideBar = (): void => {
		this.setState({ showSidePane: true });
	};

	handleSideBarClose = (): void => {
		this.setState({ showSidePane: false });
	};
}
