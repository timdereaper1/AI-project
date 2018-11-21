import React from 'react';
import { Button } from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RouteComponentProps } from 'react-router-dom';
import image1 from '../_shared/assets/imgs/firs.jpg';
import './css/content.css';

interface Styles {
	button: React.CSSProperties;
	button2: React.CSSProperties;
}

class EssayContent extends React.Component<RouteComponentProps> {
	state = {
		data: '<p>Content</p>'
	};

	render(): React.ReactNode {
		return (
			<div className="essay-content-wrapper">
				<div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
					<img src={image1} alt="" className="essay-content-profile-img" />
					<div className="essay-content-profile-card">
						<h1 stlye={{ textAlign: 'center' }}>AMA</h1>
						<h3 style={{ fontFamily: 'Segoe UI', fontWeight: 'normal' }}>
							New and Improved Automated Essay Marker
						</h3>
						<ul>
							<li>Detail one</li>
							<li>Detail two</li>
							<li>Detail three</li>
							<li>Detail four</li>
							<li>Detail five</li>
						</ul>
					</div>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
					<div style={{ display: 'flex', flexDirection: 'row', height: '20%' }}>
						<input
							type="text"
							placeholder="Title.."
							style={{ marginTop: '75px', marginLeft: '2%', width: '100%' }}
						/>
						<Button style={styles.button2}>Here</Button>
					</div>
					<div style={{ marginTop: '55px' }}>
						<CKEditor
							editor={ClassicEditor}
							data={this.state.data}
							onInit={this.handleEditorLoad}
							onChange={this.handleEditorChange}
						/>
						<Button style={styles.button} onClick={this.handleProceedClick}>
							Click to Proceed
						</Button>
					</div>
				</div>
			</div>
		);
	}

	handleEditorLoad = (editor: any): void => {
		console.log('Editor is ready to use', editor);
	};

	handleEditorChange = (event: any, editor: any): void => {
		const data = editor.getData();
		console.log({ event, editor, data });
	};

	handleProceedClick = (): void => {
		this.props.history.push('/');
	};
}

const styles: Styles = {
	button: {
		color: ' white',
		background: '#173994',
		borderRadius: '1px',
		align: 'right',
		marginTop: '10px',
		height: '35px',
		weight: '10%'
	},
	button2: {
		weight: '40%',
		color: 'white',
		background: '#FE26F4',
		marginTop: '75px',
		borderRadius: '1px',
		marginLeft: '5px',
		fontWeight: 'normal'
	}
};

export default EssayContent;
