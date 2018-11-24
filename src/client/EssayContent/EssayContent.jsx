import React from 'react';
import { Button, Input, Container, Header, List } from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RouteComponentProps } from 'react-router-dom';
import image1 from '../_shared/assets/imgs/11.jpg';
import './css/content.css';
import ResultModal from './ResultModal';
import details from './_data/details.json';
import { AppHeader } from '../_shared/components';
import { submitEssay } from '../_shared/services';

class EssayContent extends React.Component<RouteComponentProps> {
	state = {
		data: '',
		details: [],
		open: false,
		result: null
	};

	componentWillMount() {
		this.setState({ details: [...this.state.details, ...details.details] });
	}

	render(): React.ReactNode {
		return (
			<Container>
				<AppHeader />
				<p style={{ padding: '0 1rem' }}>
					AMA is an AI agent trained to access and score english essays with selected
					criteria standards for essay scoring. Click here to view criteria. <br />
					The title of the essay is required and must be entered in the input field below,
					else AMA cannot fully access the essay. Type in your essay in the provided text
					editor, then click on submit button to submit the essay for marking.
				</p>
				<div className="essay-content wrapper">
					<div className="profile">
						<img src={image1} alt="" className="profile-img" />
						<div className="profile-card">
							<Header size="medium">Grading Scale</Header>
							<List divided animated>
								{this.state.details.map((detail, _i) => (
									/* eslint-disable-next-line react/no-array-index-key */
									<List.Item key={_i}>
										<List.Content>{detail.name}</List.Content>
									</List.Item>
								))}
							</List>
						</div>
					</div>
					<div className="form">
						<div className="title-form">
							<Input
								type="text"
								placeholder="Enter the title of the essay..."
								className="title-input"
							/>
							<Button onClick={this.handleEssaySubmission} className="submit-button">
								Submit
							</Button>
						</div>
						<div className="editor-wrapper">
							<CKEditor
								style={{ height: '100vh' }}
								editor={ClassicEditor}
								data={this.state.data}
								onChange={this.handleEditorChange}
							/>
							<ResultModal
								result={this.state.result}
								open={this.state.open}
								onClick={this.handleProceedClick}
							/>
						</div>
					</div>
				</div>
			</Container>
		);
	}

	handleEditorChange = (event: any, editor: any): void => {
		const data = editor.getData();
		this.setState({ data });
	};

	handleProceedClick = (): void => {
		this.props.history.push('/analysis', this.state.result);
	};

	handleEssaySubmission = async (): void => {
		const html = this.state.data
			.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, '\n')
			.replace(/<\/?[^>]+(>|$)/g, '')
			.trim();
		const result = await submitEssay(html);
		if (result) {
			this.setState({
				result,
				open: true
			});
		}
	};
}

export default EssayContent;
