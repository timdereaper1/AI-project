import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './css/sidebar.css';
import profile from '../_shared/assets/imgs/11.jpg';

interface SidebarProps {
	links: Array<{ name: string, icon: string, path: string, desc: string }>;
	selectedPage: string;
}

const Sidebar: React.FunctionComponent<SidebarProps> = props => (
	<div className="sidebar">
		<Header inverted textAlign="center" className="header" size="medium">
			ama
			<Header.Subheader>New and Improved Automated Essay Marker</Header.Subheader>
		</Header>
		<div className="profile">
			<img src={profile} alt="profile" className="profile-img" />
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
						<span className="desc">{link.desc}</span>
					</div>
				</Link>
			))}
		</nav>
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
	selectedPage: PropTypes.string.isRequired
};

export default Sidebar;
