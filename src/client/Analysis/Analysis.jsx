import React from 'react';
import { Sidebar, Dimmer, Header, Button } from 'semantic-ui-react';
import result from './_data/result.json';
import { filterEssayResults } from './_helpers';
import AnalysisView from './AnalysisView';
import './css/analysis.css';

export default class Analysis extends React.Component<{}> {
	state = {
		pos: null,
		essay: null,
		showSidePane: false
	};

	componentWillMount() {
		const results = filterEssayResults(result);
		this.setState({
			pos: results.pos,
			essay: results.essay
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
					<div className="analysis-sidebar">
						<Button
							className="analysis-sidebar-close-btn"
							icon="close"
							floated="right"
							basic
							color="red"
							compact
							onClick={this.handleSideBarClose}
						/>
						<Header>Parts of Speech</Header>
					</div>
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
							pos={this.state.pos}
							essay={this.state.essay}
							onSideBarView={this.handleSideBar}
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
