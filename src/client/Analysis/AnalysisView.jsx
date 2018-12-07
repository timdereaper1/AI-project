import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Grid, Button } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import AnalysisTable from './AnalysisTable';
import AnalysisChart from './AnalysisChart';
import { merge, Analysis, POSDetails, dataAnalysis, getDataValues, getDataKeys } from './_helpers';
import './css/view.css';
import { AppFooter } from '../_shared/components';
import { score } from '../_shared/services';

interface AnalysisViewProps extends RouteComponentProps {
	essay: Analysis;
	pos: Analysis;
	onSideBarView: Function;
	details: Array<POSDetails>;
	score: number;
	data: {};
}

const AnalysisView: React.FunctionComponent<AnalysisViewProps> = props => {
	const totalScores = merge(props.essay.labels, props.essay.series);
	const wordVals = dataAnalysis(props.data, 'words');
	const sentsVals = dataAnalysis(props.data, 'senc');
	const parasVals = dataAnalysis(props.data, 'para');
	console.log(props.data);
	return (
		<React.Fragment>
			<div className="analysis">
				<Header size="medium" className="main-header">
					Score: {score(props.score)}
				</Header>
				<Grid>
					<Grid.Row>
						<Grid.Column width={8}>
							<div className="widget">
								<AnalysisChart
									type="pie"
									title="Chart showing General Essay Scores"
									data={props.essay.series}
									labels={props.essay.labels}
									width="340"
								/>
							</div>
						</Grid.Column>
						<Grid.Column width={8}>
							<div className="widget">
								<AnalysisChart
									type="pie"
									title="Analysis on Words"
									data={getDataValues(wordVals)}
									labels={getDataKeys(wordVals)}
									width="340"
								/>
							</div>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8}>
							<div className="widget">
								<AnalysisChart
									type="pie"
									title="Analysis on Sentences"
									data={getDataValues(sentsVals)}
									labels={getDataKeys(sentsVals)}
									width="340"
								/>
							</div>
						</Grid.Column>
						<Grid.Column width={8}>
							<div className="widget">
								<AnalysisChart
									type="pie"
									title="Analysis on Paragraphs"
									data={getDataValues(parasVals)}
									labels={getDataKeys(parasVals)}
									width="340"
								/>
							</div>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={10}>
							<div className="widget">
								<AnalysisChart
									type="line"
									title="Chart Showing Parts Of Speech In Essay"
									data={[{ name: 'POS', data: props.pos.series }]}
									labels={props.pos.labels}
									width={540}
								/>
							</div>
						</Grid.Column>
						{/* <Grid.Column width={7}>
							<div className="widget">
								<Header>Table Showing Basic Essay Elements</Header>
								<AnalysisTable values={totalScores} />
							</div>
						</Grid.Column>
						<Grid.Column width={9}>
							<div className="widget">
								<Header>
									Table Showing Parts Of Speech Of The Essay
									<Button
										size="mini"
										circular
										floated="right"
										compact
										positive
										onClick={props.onSideBarView}
									>
										View
									</Button>
								</Header>
								<AnalysisTable
									values={props.details}
									extend
									endValue={totalScores.length}
								/>
							</div>
						</Grid.Column> */}
					</Grid.Row>
				</Grid>
			</div>
			<AppFooter />
		</React.Fragment>
	);
};

AnalysisView.propTypes = {
	essay: PropTypes.shape({
		series: PropTypes.arrayOf(PropTypes.number),
		labels: PropTypes.arrayOf(PropTypes.string)
	}),
	pos: PropTypes.shape({
		series: PropTypes.arrayOf(PropTypes.number),
		labels: PropTypes.arrayOf(PropTypes.string)
	}),
	onSideBarView: PropTypes.func.isRequired,
	details: PropTypes.arrayOf(PropTypes.object),
	score: PropTypes.number.isRequired
};

AnalysisView.defaultProps = {
	essay: null,
	pos: null,
	details: null
};

export default AnalysisView;
