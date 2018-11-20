import React from 'react';
import { Container, Grid, Header, Button } from 'semantic-ui-react';
import EssayAnalysis from './EssayAnalysis';
import POSAnalysis from './POSAnalysis';
import result from './result.json';
import pos from './pos.json';
import { filterEssayResults, merge, posList } from './_helpers';
import AnalysisTable from './AnalysisTable';
import './css/analysis.css';

export default class Analysis extends React.Component<{}> {
	state = {
		pos: {
			series: null,
			labels: null
		},
		essay: {
			series: null,
			labels: null
		}
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
									series={this.state.essay.series}
									labels={this.state.essay.labels}
									width="340"
								/>
							</div>
						</Grid.Column>
						<Grid.Column width={9}>
							<div className="analysis-widget-block">
								<POSAnalysis
									title="Chart for Essay "
									series={this.state.pos.series}
									labels={this.state.pos.labels}
									width={540}
								/>
							</div>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={7}>
							<div className="analysis-widget-block">
								<Header>Table Showing Basic Essay Elements</Header>
								<AnalysisTable
									values={merge(this.state.essay.labels, this.state.essay.series)}
								/>
							</div>
						</Grid.Column>
						<Grid.Column width={9}>
							<div className="analysis-widget-block">
								<Header>
									Table Showing Parts Of Speech Of The Essay
									<Button size="mini" circular floated="right" compact positive>
										View
									</Button>
								</Header>
								<AnalysisTable
									values={posList(
										pos,
										this.state.pos.labels,
										this.state.pos.series
									)}
									extend
									endValue={6}
								/>
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}
