import React from 'react';
import PropTypes from 'prop-types';
import ApexCharts from 'react-apexcharts';
import './css/chart.css';

interface Props {
	type: 'pie' | 'line' | 'bar';
	options?: {};
	data?: Array<number> | Array<{ name: string, data: Array<number> }>;
	title: string;
	labels?: Array<string>;
	width?: number | string;
}

const AnalysisChart = (props: Props) => {
	const options = {
		labels: props.labels,
		title: {
			text: props.title,
			align: 'center',
			style: {
				fontSize: '20px',
				color: '#263238'
			}
		},
		legend: { position: 'bottom' },
		...props.options
	};
	return (
		<div>
			<ApexCharts
				options={options}
				series={props.data}
				type={props.type}
				width={props.width}
			/>
		</div>
	);
};

AnalysisChart.propTypes = {
	type: PropTypes.string.isRequired,
	options: PropTypes.shape({}),
	labels: PropTypes.arrayOf(PropTypes.string),
	data: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.number),
		PropTypes.arrayOf(PropTypes.object)
	]),
	title: PropTypes.string.isRequired,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

AnalysisChart.defaultProps = {
	options: {},
	labels: [],
	data: [],
	width: 380
};

export default AnalysisChart;
