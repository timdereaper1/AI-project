import React from 'react';
import PropTypes from 'prop-types';
import { OverviewListView } from './OverviewListView';
import { Overall } from './_helpers';

type Props = {
	data?: Array<Overall>,
	onSelect: Function
};

export const OverviewList = (props: Props) => {
	if (!props.data) {
		return <div>No data</div>;
	}

	return <OverviewListView data={props.data} onSelect={props.onSelect} />;
};

OverviewList.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	onSelect: PropTypes.func.isRequired
};

OverviewList.defaultProps = {
	data: null
};
