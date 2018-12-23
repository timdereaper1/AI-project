import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GradingScheme from './GradingScheme';
import './css/settings.css';
import { Scheme, Constants, getGradeChar, SettingsProps, SettingsState } from './_helpers';
import { setSchemeState } from '../_shared/redux/actions';

class Settings extends React.Component<SettingsProps, SettingsState> {
	state = {
		scheme: [],
		isSaved: true
	};

	static propTypes = {
		setSchemeState: PropTypes.func.isRequired
	};

	componentWillMount() {
		if (window.localStorage.getItem(Constants.keys.store.GRADE_SCHEME)) {
			this.setState({
				scheme: JSON.parse(window.localStorage.getItem(Constants.keys.store.GRADE_SCHEME))
			});
		}
	}

	render() {
		return (
			<div className="settings wrapper">
				<GradingScheme
					onSchemeAdd={this.onSchemeAdd}
					onSchemeDelete={this.onSchemeDelete}
					onSchemeChange={this.onSchemeChange}
					scheme={this.state.scheme}
					onSaveScheme={this.onSaveScheme}
					isSaved={this.state.isSaved}
					onCreateScheme={this.onCreateScheme}
				/>
			</div>
		);
	}

	onSchemeChange = (index: number, key: string, value: string | number): void => {
		const schemes: Array<Scheme> = this.state.scheme;
		schemes[index][key] = value;
		this.setState({ scheme: schemes, isSaved: false });
	};

	onSchemeDelete = (index: number): void => {
		this.setState({
			scheme: this.state.scheme.filter((val, _i) => _i !== index),
			isSaved: false
		});
	};

	onSchemeAdd = (): void => {
		const { scheme: schemes } = this.state;
		const last = schemes[schemes.length - 1];
		const max = parseInt(last.min) - 1;
		const min = max - (parseInt(last.max) - parseInt(last.min));
		const grade = getGradeChar(last.grade);
		const next: Scheme = {
			grade,
			max,
			min
		};
		this.setState({
			scheme: [...schemes, next],
			isSaved: false
		});
	};

	onSaveScheme = (): void => {
		localStorage.setItem(Constants.keys.store.GRADE_SCHEME, JSON.stringify(this.state.scheme));
		this.setState({
			isSaved: true
		});
		// call app store action to reload the scheme state
		this.props.setSchemeState();
	};

	onCreateScheme = (): void => {
		const newScheme: Scheme = {
			grade: 'A',
			min: 80,
			max: 100
		};
		this.setState({
			scheme: [newScheme],
			isSaved: false
		});
	};
}

export default connect(
	null,
	{
		setSchemeState
	}
)(Settings);
