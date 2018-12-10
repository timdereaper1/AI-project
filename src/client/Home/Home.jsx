import React from 'react';
import { Header, Segment, Grid, Icon } from 'semantic-ui-react';
import { RouteComponentProps, Link } from 'react-router-dom';
import './css/home.css';
import image from '../_shared/assets/imgs/firs.jpg';
import Footer from './Footer';

interface Styles {
	[key: string]: React.CSSProperties;
}

class Home extends React.Component<RouteComponentProps> {
	constructor(props) {
		super(props);
		this.bannerRef = React.createRef();
	}

	componentDidMount() {
		window.addEventListener('scroll', e => {});
	}

	componentWillUnmount() {
		window.removeEventListener('scroll');
	}

	render(): React.ReactNode {
		console.log(this.bannerRef);
		return (
			<div className="home">
				<div className="banner" style={styles.wrapper} ref={this.bannerRef}>
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
								<Icon name="check" className="service-icon" />
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Exercitationem, minus hic error
								</p>
							</Grid.Column>
							<Grid.Column>
								<Header>Grading</Header>
								<Icon name="file alternate outline" className="service-icon" />
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Exercitationem, minus hic error
								</p>
							</Grid.Column>
							<Grid.Column>
								<Header>Analysis</Header>
								<Icon name="area chart" className="service-icon" />
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Exercitationem, minus hic error
								</p>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
				<p style={{ padding: '0 1rem' }}>
					AMA is an AI agent trained to access and score english essays with selected
					criteria standards for essay scoring. Click here to view criteria. <br />
					The title of the essay is required and must be entered in the input field below,
					else AMA cannot fully access the essay. Type in your essay in the provided text
					editor, then click on submit button to submit the essay for marking.
				</p>
				<p className="desc">
					AMA shows you the results of your essay through charts and graphs. <br />
					The pie chart shows the standard elements taken from scoring an essay such as
					number of misspelt words and others <br />
					The line chart shows the total score given to various parts of speech written in
					the essay such as nouns, verbs and others. Click on the view button to see all
					the scores on parts of speech for the essay.
				</p>
				<Footer />
			</div>
		);
	}
}

const styles: Styles = {
	wrapper: {
		backgroundImage: `url(${image})`
	}
};

export default Home;
