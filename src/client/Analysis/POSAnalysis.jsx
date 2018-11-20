import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { ChartProps } from './_helpers';

export const POSAnalysis: React.FunctionComponent<ChartProps> = props => {
	const options = {
		...props.options,
		labels: props.labels,
		title: {
			text: 'Line Chart Showing Parts Of Speech In Essay',
			align: 'center',
			style: {
				fontSize: '20px',
				color: '#263238'
			}
		}
	};

	const series = [
		{
			name: 'series-1',
			data: props.series
		}
	];

	return <Chart options={options} series={series} type="line" width={props.width} />;
};

POSAnalysis.propTypes = {
	options: PropTypes.shape(),
	series: PropTypes.arrayOf(PropTypes.number).isRequired,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	labels: PropTypes.arrayOf(PropTypes.string)
};

POSAnalysis.defaultProps = {
	width: 500,
	labels: [],
	options: {}
};

export default POSAnalysis;
