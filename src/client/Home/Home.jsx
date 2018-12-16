import React from 'react';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './css/home.css';
import image from '../_shared/assets/imgs/firs.jpg';
import Footer from './Footer';
import Features from './Features';

type Props = {};

class Home extends React.Component<Props, void> {
	bannerRef: React.RefObject<any>;
	event: any = null;

	constructor(props: Props) {
		super(props);
		this.bannerRef = React.createRef();
	}

	componentWillMount() {
		this.event = window.addEventListener(
			'scroll',
			() => {
				if (this.bannerRef.current) {
					this.bannerRef.current.style.backgroundPositionY = `${-window.scrollY / 3}px`;
				}
			},
			false
		);
	}

	render() {
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
				<Features />
				<Footer />
			</div>
		);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.event, false);
	}
}

const styles = {
	wrapper: {
		backgroundImage: `url(${image})`
	}
};

export default Home;
