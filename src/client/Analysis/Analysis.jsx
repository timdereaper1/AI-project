import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import pos from './_data/pos.json';
import { filterEssayResults, posScoreInfo } from './_helpers';
import AnalysisView from './AnalysisView';
import './css/analysis.css';

export default class Analysis extends React.Component<RouteComponentProps> {
	state = {
		pos: null,
		essay: null,
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
		}
	}

	render(): React.ReactNode {
		if (!this.state.data) {
			return (
				<div className="analysis">
					<Header className="error" size="huge" textAlign="center">
						No submitted essay
						<Header.Subheader>
							You must submit and essay for marking before viewing the analysis. Click{' '}
							<Link to="/dashboard/content">here</Link> to write an essay.
						</Header.Subheader>
					</Header>
				</div>
			);
		}
		return (
			<AnalysisView
				pos={this.state.pos}
				essay={this.state.essay}
				details={this.state.list}
				score={this.state.score}
				data={this.state.data}
			/>
		);
	}
}
