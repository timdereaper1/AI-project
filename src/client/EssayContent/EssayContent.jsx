import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import './css/content.css';
import ResultModal from './ResultModal';
import details from './_data/details.json';
import EssayForm from './EssayForm';
import { submitEssayForm, getGrade, EssayContentProps, EssayContentState } from './_helpers';
import { setResults } from './_redux/actions';

class EssayContent extends React.Component<EssayContentProps, EssayContentState> {
	state = {
		data: '',
		details: [],
		open: false,
		result: null,
		title: '',
		grade: '',
		alert: false,
		message: ''
	};

	static propTypes = {
		setResults: PropTypes.func.isRequired,
		scheme: PropTypes.arrayOf(
			PropTypes.shape({
				min: PropTypes.number,
				max: PropTypes.number,
				grade: PropTypes.string
			})
		)
	};

	static defaultProps = {
		scheme: null
	};

	componentWillMount() {
		this.setState({ details: [...this.state.details, ...details.details] });
	}

	render() {
		return (
			<div className="essay-content">
				<SweetAlert
					show={this.state.alert}
					title="Error"
					text={this.state.message}
					onConfirm={this.handleAlert}
					type="error"
				/>
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
						grade={this.state.grade}
					/>
				</div>
			</div>
		);
	}

	handleEditorChange = (event: any, editor: any): void => {
		const data: string = editor.getData();
		this.setState({ data });
	};

	handleProceedClick = (): void => {
		if (this.state.result) {
			const { result, grade } = this.state;
			this.props.setResults({ ...result, grade });
			this.props.history.push('/dashboard/analysis');
		}
	};

	handleEssaySubmission = async () => {
		if (!this.props.scheme) {
			this.setState({
				alert: true,
				message:
					'Please set the grading scheme for the essay. Click the settings icon to add the grading scheme.'
			});
			return;
		}
		if (!this.state.data) {
			this.setState({
				alert: true,
				message: 'Cannot submit an empty essay.'
			});
			return;
		}
		const result = await submitEssayForm(this.state.data, this.state.title);
		if (result) {
			const grade = getGrade(result.score, this.props.scheme);
			if (!grade) {
				this.setState({
					alert: true,
					message:
						"The score couldn't match the grading scheme. Please check your grading scheme."
				});
				return;
			}
			this.setState({
				result,
				open: true,
				grade
			});
		}
	};

	handleTitleInput = (event): void => {
		this.setState({ title: event.target.value });
	};

	handleModalClose = (): void => {
		this.setState({ open: false });
	};

	handleResultView = (): void => {
		this.setState({ open: true });
	};

	handleAlert = (): void => {
		this.setState({ alert: false, message: '' });
	};
}

const mapStateToProps = state => ({
	scheme: state.dashboard.scheme
});

export default connect(
	mapStateToProps,
	{
		setResults
	}
)(EssayContent);
