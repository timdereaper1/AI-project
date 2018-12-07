import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './css/form.css';

interface EssayFormProps {
	onSubmit: Function;
	onTextChange: Function;
	title: string;
	onEditorChange: Function;
	editorValue: string;
}

const EssayForm: React.FunctionComponent<EssayFormProps> = props => (
	<div className="essay-form">
		<div className="title">
			<Input
				type="text"
				placeholder="Enter the title of the essay..."
				className="input-field"
				onChange={props.onTextChange}
			/>
			<small className="help-blk">
				The title of the essay is used to categorize the essay.
			</small>
		</div>
		<div className="editor">
			<CKEditor
				style={{ height: '100vh' }}
				editor={ClassicEditor}
				data={props.editorValue}
				onChange={props.onEditorChange}
			/>
			<small className="help-blk">
				Write your essay in the editor above. Please ensure that you have throughly gone
				through the essay before submitting.
			</small>
		</div>
		<div style={{ textAlign: 'right' }}>
			<Button onClick={props.onSubmit} className="submit-btn">
				Submit
			</Button>
		</div>
	</div>
);

EssayForm.propTypes = {
	onTextChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onEditorChange: PropTypes.func.isRequired,
	editorValue: PropTypes.string.isRequired
};

export default EssayForm;
