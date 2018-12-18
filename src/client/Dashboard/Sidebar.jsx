import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './css/sidebar.css';

interface Props {
	links: Array<{ name: string, icon: string, path: string, desc: string }>;
	selectedPage: string;
	onCollapse: Function;
	collapse: boolean;
}

const Sidebar = (props: Props) => (
	<div className={props.collapse ? 'sidebar collapse' : 'sidebar'}>
		<Header inverted textAlign="center" className="header" size="large">
			<Link to="/">ama</Link>
			<Header.Subheader>New and Improved Automated Essay Marker</Header.Subheader>
		</Header>
		<div className="profile">
			<img src="/static/images/11.jpg" alt="profile" className="profile-img" />
			<small>
				<span className="label">Name</span> AI-project
			</small>
		</div>
		<nav className="navs">
			{props.links.map((link, _i) => (
				/* eslint-disable react/no-array-index-key */
				<Link
					key={_i}
					to={link.path}
					className={props.selectedPage === link.path ? 'nav active' : 'nav'}
				>
					<Icon name={link.icon} inverted className="nav-icon" size="large" />
					<div className="content">
						<span className="header">{link.name}</span>
					</div>
				</Link>
			))}
		</nav>
		<Button onClick={props.onCollapse} size="small" className="resize-btn">
			<Icon
				size="small"
				name={props.collapse ? 'angle double right' : 'angle double left'}
				inverted
			/>
			<span>Collapse</span>
		</Button>
	</div>
);

Sidebar.propTypes = {
	links: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			path: PropTypes.string,
			desc: PropTypes.string
		})
	).isRequired,
	selectedPage: PropTypes.string.isRequired,
	onCollapse: PropTypes.func.isRequired,
	collapse: PropTypes.bool.isRequired
};

export default Sidebar;
