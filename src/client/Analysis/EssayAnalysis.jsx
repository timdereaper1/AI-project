import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { ChartProps } from './_helpers';

export const EssayAnalysis: React.FunctionComponent<ChartProps> = props => {
	const options = {
		...props.options,
		labels: props.labels,
		title: {
			text: 'Chart showing General Essay Scores',
			align: 'center',
			style: {
				fontSize: '20px',
				color: '#263238'
			}
		},
		legend: {
			position: 'bottom'
		}
	};

	return <Chart options={options} series={props.series} type="pie" width={props.width} />;
};

EssayAnalysis.propTypes = {
	options: PropTypes.shape(),
	series: PropTypes.arrayOf(PropTypes.number).isRequired,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	labels: PropTypes.arrayOf(PropTypes.string)
};

EssayAnalysis.defaultProps = {
	width: 380,
	labels: [],
	options: {}
};

export default EssayAnalysis;
