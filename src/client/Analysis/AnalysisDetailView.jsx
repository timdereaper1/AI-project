import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header } from 'semantic-ui-react';
import './css/analysis.css';
import AnalysisTable from './AnalysisTable';
import { POSDetails } from './_helpers';

interface AnalysisDetailViewProps {
	onClose: Function;
	details: Array<POSDetails>;
}

const AnalysisDetailView: React.FunctionComponent<AnalysisDetailViewProps> = props => {
	return (
		<div className="analysis-sidebar">
			<Header>
				Parts of Speech
				<Button
					className="analysis-sidebar-close-btn"
					icon="close"
					floated="right"
					basic
					color="red"
					compact
					onClick={props.onClose}
				/>
			</Header>
			<AnalysisTable values={props.details} extend />
		</div>
	);
};

AnalysisDetailView.propTypes = {
	onClose: PropTypes.func.isRequired,
	details: PropTypes.arrayOf(PropTypes.object)
};

AnalysisDetailView.defaultProps = {
	details: null
};

export default AnalysisDetailView;
