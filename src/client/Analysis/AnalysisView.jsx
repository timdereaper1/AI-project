import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Grid, Button } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import AnalysisTable from './AnalysisTable';
import AnalysisChart from './AnalysisChart';
import { merge, Analysis, POSDetails } from './_helpers';
import './css/view.css';
import { AppHeader } from '../_shared/components';
import { score } from '../_shared/services';

interface AnalysisViewProps extends RouteComponentProps {
	essay: Analysis;
	pos: Analysis;
	onSideBarView: Function;
	details: Array<POSDetails>;
	score: number;
}

const AnalysisView: React.FunctionComponent<AnalysisViewProps> = props => (
	<div className="analysis">
		<Container>
			<AppHeader />
			<p className="desc">
				AMA shows you the results of your essay through charts and graphs. <br />
				The pie chart shows the standard elements taken from scoring an essay such as number
				of misspelt words and others <br />
				The line chart shows the total score given to various parts of speech written in the
				essay such as nouns, verbs and others. Click on the view button to see all the
				scores on parts of speech for the essay.
			</p>
			<Header size="medium" className="main-header">
				Score: {score(props.score)}
			</Header>
			<Grid>
				<Grid.Row>
					<Grid.Column width={7}>
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
					<Grid.Column width={9}>
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
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={7}>
						<div className="widget">
							<Header>Table Showing Basic Essay Elements</Header>
							<AnalysisTable values={merge(props.essay.labels, props.essay.series)} />
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
							<AnalysisTable values={props.details} extend endValue={6} />
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	</div>
);

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
