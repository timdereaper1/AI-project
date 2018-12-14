import React from 'react';
import GradingScheme from './GradingScheme';
import './css/settings.css';

class Settings extends React.Component<{}> {
	state = {};

	render(): React.ReactNode {
		return (
			<div className="settings wrapper">
				<GradingScheme />
			</div>
		);
	}
}

export default Settings;
