import React from 'react';
import { Sidebar, Dimmer, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import pos from './_data/pos.json';
import { filterEssayResults, posScoreInfo } from './_helpers';
import AnalysisView from './AnalysisView';
import AnalysisDetailView from './AnalysisDetailView';

export default class Analysis extends React.Component<RouteComponentProps> {
	state = {
		pos: null,
		essay: null,
		showSidePane: false,
		list: null,
		score: 0,
		data: null
	};

	componentWillMount() {
		const { state } = this.props.location;
		if (state) {
			const { pos: resultPOS, essay } = filterEssayResults(state);
			const list = posScoreInfo(pos, resultPOS.labels, resultPOS.series);
			this.setState({
				pos: resultPOS,
				essay,
				list,
				score: state.score,
				data: state.values
			});
		} else {
			this.props.history.replace('/content');
		}
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
								Scores for parts of speech
							</Header>
						</Dimmer>
						<AnalysisView
							{...this.props}
							pos={this.state.pos}
							essay={this.state.essay}
							onSideBarView={this.handleSideBar}
							details={this.state.list}
							score={this.state.score}
							data={this.state.data}
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
