import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import './css/content.css';
import ResultModal from './ResultModal';
import details from './_data/details.json';
import { AppFooter } from '../_shared/components';
import EssayForm from './EssayForm';
import { submitEssayForm } from './_helpers';
import { setResults } from './_redux/actions';

class EssayContent extends React.Component<RouteComponentProps> {
	state = {
		data: '',
		details: [],
		open: false,
		result: null,
		title: ''
	};

	static propTypes = {
		setResults: PropTypes.func.isRequired
	};

	componentWillMount() {
		this.setState({ details: [...this.state.details, ...details.details] });
	}

	render(): React.ReactNode {
		return (
			<div className="essay-content">
				<div className="wrapper">
					<p className="desc">
						You can write your own essay or select an essay from the essay list.
					</p>
					<EssayForm
						onSubmit={this.handleEssaySubmission}
						onEditorChange={this.handleEditorChange}
						editorValue={this.state.data}
						title={this.state.title}
						onTextChange={this.handleTitleInput}
					/>
					<ResultModal
						result={this.state.result}
						open={this.state.open}
						onClick={this.handleProceedClick}
						onClose={this.handleModalClose}
					/>
				</div>
				<AppFooter />
			</div>
		);
	}

	handleEditorChange = (event: any, editor: any): void => {
		const data: string = editor.getData();
		this.setState({ data });
	};

	handleProceedClick = (): void => {
		if (this.state.result) {
			this.props.setResults(this.state.result);
			this.props.history.push('/dashboard/analysis');
		}
	};

	handleEssaySubmission = async (): void => {
		if (!this.state.data) return;
		const result = await submitEssayForm(this.state.data, this.state.title);
		if (result) {
			this.setState({
				result,
				open: true
			});
		}
	};

	handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ title: event.target.value });
	};

	handleModalClose = (): void => {
		this.setState({ open: false });
	};

	handleResultView = (): void => {
		this.setState({ open: true });
	};
}

export default connect(
	null,
	{
		setResults
	}
)(EssayContent);
