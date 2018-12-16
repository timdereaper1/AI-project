import React from 'react';
import { Segment, Header, Icon, Grid } from 'semantic-ui-react';
import './css/home.css';

const Features = () => (
	<Segment className="services" padded>
		<Grid>
			<Grid.Row columns="3">
				<Grid.Column>
					<Header>Scoring</Header>
					<Icon name="check" className="service-icon" />
					<p>Score essays easily and faster with AMA optimized scoring system.</p>
				</Grid.Column>
				<Grid.Column>
					<Header>Grading</Header>
					<Icon name="file alternate outline" className="service-icon" />
					<p>AMA grades essays using standand essay grading with set criteria.</p>
				</Grid.Column>
				<Grid.Column>
					<Header>Analysis</Header>
					<Icon name="area chart" className="service-icon" />
					<p>Visualize and analyze AMA scores on essays and improve essay writing.</p>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</Segment>
);

export default Features;
