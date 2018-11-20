import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Grid, Button } from 'semantic-ui-react';
import AnalysisTable from './AnalysisTable';
import EssayAnalysis from './EssayAnalysis';
import POSAnalysis from './POSAnalysis';
import { merge, posList } from './_helpers';
import pos from './_data/pos.json';
import './css/view.css';

interface Analysis {
	series: Array<number>;
	labels: Array<string>;
}

interface AnalysisViewProps {
	essay: Analysis;
	pos: Analysis;
	onSideBarView: Function;
}

const AnalysisView: React.FunctionComponent<AnalysisViewProps> = props => (
	<Container>
		<Header as="h1" size="huge" textAlign="center">
			Essay Analysis
		</Header>
		<Grid>
			<Grid.Row>
				<Grid.Column width={7}>
					<div className="analysis-widget-block">
						<EssayAnalysis
							title="Chart for Essay "
							series={props.essay.series}
							labels={props.essay.labels}
							width="340"
						/>
					</div>
				</Grid.Column>
				<Grid.Column width={9}>
					<div className="analysis-widget-block">
						<POSAnalysis
							title="Chart for Essay "
							series={props.pos.series}
							labels={props.pos.labels}
							width={540}
						/>
					</div>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column width={7}>
					<div className="analysis-widget-block">
						<Header>Table Showing Basic Essay Elements</Header>
						<AnalysisTable values={merge(props.essay.labels, props.essay.series)} />
					</div>
				</Grid.Column>
				<Grid.Column width={9}>
					<div className="analysis-widget-block">
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
							values={posList(pos, props.pos.labels, props.pos.series)}
							extend
							endValue={6}
						/>
					</div>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</Container>
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
	onSideBarView: PropTypes.func.isRequired
};

AnalysisView.defaultProps = {
	essay: null,
	pos: null
};

export default AnalysisView;
