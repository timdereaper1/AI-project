import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import './css/home.css';
import image from '../_shared/assets/imgs/firs.jpg';

interface Styles {
	wrapper: React.CSSProperties;
	button: React.CSSProperties;
}

class Home extends React.Component<RouteComponentProps> {
	render(): React.ReactNode {
		return (
			<div className="home-page-wrapper" style={styles.wrapper}>
				<Header className="home-page-title" textAlign="center">
					Welcome
					<Header.Subheader className="home-page-desc">
						Welcome to the new and improved Essay Grading System. An innovative solution
						to grading essays
					</Header.Subheader>
				</Header>
				<Button style={styles.button} onClick={this.handleProceedClick}>
					Click to Proceed
				</Button>
			</div>
		);
	}

	handleProceedClick = (): void => {
		this.props.history.push('/content');
	};
}

const styles: Styles = {
	wrapper: {
		backgroundImage: `url(${image})`
	},
	button: {
		background: '#173994',
		borderRadius: '30px',
		backgroundColor: 'transparent',
		borderWidth: '10%',
		borderColor: 'blue'
	}
};

export default Home;
