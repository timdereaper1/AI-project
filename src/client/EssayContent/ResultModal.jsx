import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import { score } from '../_shared/services';
import './css/result.css';

interface ResultModalProps {
	onClick: Function;
	open?: boolean;
	result?: { score: number };
	onClose: Function;
}

const ResultModal: React.FunctionComponent<ResultModalProps> = props => (
	<Modal closeOnDocumentClick onClose={props.onClose} open={props.open} basic className="result">
		<Modal.Header style={styles.header}>Essay Score</Modal.Header>
		<Modal.Content>
			<Modal.Description style={{ textAlign: 'center' }}>
				<div>
					<Progress
						style={{ color: 'white' }}
						type="circle"
						percent={props.result ? score(props.result.score) : 0}
					/>
				</div>
				<p className="desc">
					Your total score on your written essay. Click the link below to view the
					analysis on the essay
				</p>
				<Button basic className="btn" onClick={props.onClick}>
					Details
				</Button>
			</Modal.Description>
		</Modal.Content>
	</Modal>
);

ResultModal.propTypes = {
	onClick: PropTypes.func.isRequired,
	open: PropTypes.bool,
	result: PropTypes.shape({
		score: PropTypes.number
	}),
	onClose: PropTypes.func.isRequired
};

ResultModal.defaultProps = {
	open: false,
	result: null
};

const styles: { header: React.CSSProperties } = {
	header: {
		textAlign: 'center',
		fontWeight: 400,
		textTransform: 'uppercase',
		fontSize: '2.1rem',
		color: '#b4d4f1'
	}
};

export default ResultModal;
