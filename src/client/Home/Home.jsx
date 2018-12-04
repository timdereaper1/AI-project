import React from 'react';
import { Header, Segment, Grid } from 'semantic-ui-react';
import { RouteComponentProps, Link } from 'react-router-dom';
import './css/home.css';
import image from '../_shared/assets/imgs/firs.jpg';

interface Styles {
	wrapper: React.CSSProperties;
}

const Home: React.FunctionComponent<RouteComponentProps> = () => {
	return (
		<div className="home">
			<div className="banner" style={styles.wrapper}>
				<div className="overlay" />
				<div className="content">
					<Header className="title" textAlign="center">
						Score, Grade and Analyse Essays
						<Header.Subheader className="desc">
							Welcome to the new and improved Essay Grading System. An innovative
							solution to grading essays
						</Header.Subheader>
					</Header>
					<Link to="/dashboard/" className="cta">
						Continue
					</Link>
				</div>
			</div>
			<Segment className="services" padded>
				<Grid>
					<Grid.Row columns="3">
						<Grid.Column>
							<Header>Scoring</Header>
						</Grid.Column>
						<Grid.Column>
							<Header>Grading</Header>
						</Grid.Column>
						<Grid.Column>
							<Header>Analysis</Header>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</div>
	);
};

const styles: Styles = {
	wrapper: {
		backgroundImage: `url(${image})`
	}
};

export default Home;
