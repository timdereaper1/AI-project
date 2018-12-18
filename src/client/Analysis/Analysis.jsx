import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import pos from './_data/pos.json';
import { filterEssayResults, posScoreInfo, POSDetails } from './_helpers';
import AnalysisView from './AnalysisView';
import './css/analysis.css';

interface Props {
	state?: any;
}

interface State {
	pos: Array<POSDetails>;
	essay: any;
	list: any;
	score: number;
	data: any;
	grade: string;
}

class Analysis extends React.Component<Props, State> {
	state = {
		pos: [],
		essay: null,
		list: null,
		score: 0,
		data: null,
		grade: ''
	};

	static propTypes = {
		state: PropTypes.shape({})
	};

	static defaultProps = {
		state: null
	};

	componentWillMount() {
		const { state } = this.props;
		if (state) {
			const { pos: resultPOS, essay } = filterEssayResults(state);
			const list = posScoreInfo(pos, resultPOS.labels, resultPOS.series);
			this.setState({
				pos: resultPOS,
				essay,
				list,
				score: state.score,
				data: state.values,
				grade: state.grade
			});
		}
	}

	render() {
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
				grade={this.state.grade}
			/>
		);
	}
}

const mapStateToProps = state => ({
	state: state.analysis.state
});

export default connect(mapStateToProps)(Analysis);
