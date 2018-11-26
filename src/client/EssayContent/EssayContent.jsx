import React from 'react';
import { Container } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import './css/content.css';
import ResultModal from './ResultModal';
import details from './_data/details.json';
import { AppHeader, AppFooter } from '../_shared/components';
import EssayForm from './EssayForm';
import EssayProfile from './EsssayProfile';
import { submitEssayForm } from './_helpers';

class EssayContent extends React.Component<RouteComponentProps> {
	state = {
		data: '',
		details: [],
		open: false,
		result: null,
		title: '',
		showResult: false
	};

	componentWillMount() {
		this.setState({ details: [...this.state.details, ...details.details] });
	}

	render(): React.ReactNode {
		return (
			<div className="essay-content">
				<AppHeader />
				<Container>
					<p style={{ padding: '0 1rem' }}>
						AMA is an AI agent trained to access and score english essays with selected
						criteria standards for essay scoring. Click here to view criteria. <br />
						The title of the essay is required and must be entered in the input field
						below, else AMA cannot fully access the essay. Type in your essay in the
						provided text editor, then click on submit button to submit the essay for
						marking.
					</p>
					<div className="essay-content wrapper">
						<EssayProfile
							details={this.state.details}
							onResultClick={this.handleResultView}
							showResult={this.state.showResult}
						/>
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
				</Container>
				<AppFooter />
			</div>
		);
	}

	handleEditorChange = (event: any, editor: any): void => {
		const data: string = editor.getData();
		// if (data.length > 10) {
		// 	// if (data.startsWith(this.state.data)) {
		// 	// 	console.log('cannot copy and paste the same content');
		// 	// 	return;
		// 	// }
		// }
		this.setState({ data });
	};

	handleProceedClick = (): void => {
		if (this.state.result) {
			this.props.history.push('/analysis', this.state.result);
		}
	};

	handleEssaySubmission = async (): void => {
		if (!this.state.data) return;
		const result = await submitEssayForm(this.state.data, this.state.title);
		if (result) {
			this.setState({
				result,
				open: true,
				showResult: true
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

export default EssayContent;
