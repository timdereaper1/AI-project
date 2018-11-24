import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import { score } from '../_shared/services';

interface ResultModalProps {
	onClick: Function;
	open?: boolean;
	result?: { score: number };
}

interface ResultModalStyles {
	wrapper: React.CSSProperties;
	content: React.CSSProperties;
}

const ResultModal: React.FunctionComponent<ResultModalProps> = props => (
	<Modal open={props.open}>
		<Modal.Header>The Essay Scored</Modal.Header>
		<Modal.Content>
			<Modal.Description>
				<div style={styles.wrapper}>
					<div style={styles.content}>
						<Progress
							type="circle"
							percent={props.result ? score(props.result.score) : 0}
						/>
						<Button
							basic
							style={{ marginTop: 20 }}
							color="blue"
							onClick={props.onClick}
						>
							Click to View Details
						</Button>
					</div>
				</div>
			</Modal.Description>
		</Modal.Content>
	</Modal>
);

ResultModal.propTypes = {
	onClick: PropTypes.func.isRequired,
	open: PropTypes.bool,
	result: PropTypes.shape({
		score: PropTypes.number
	})
};

ResultModal.defaultProps = {
	open: false,
	result: null
};

const styles: ResultModalStyles = {
	wrapper: {
		display: 'flex',
		padding: 20,
		flexDirection: 'row'
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'left',
		alignItems: 'left'
	}
};

export default ResultModal;
