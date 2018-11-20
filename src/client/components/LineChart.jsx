import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { ChartProps } from './_helpers';
import './css/chart.css';

export const LineChart: React.FunctionComponent<ChartProps> = (props: ChartProps) => {
	const options = {
		...props.options,
		labels: props.labels,
		title: {
			text: props.title,
			align: 'center',
			style: {
				fontSize: '24px',
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

	return (
		<div className="chart-block">
			<Chart options={options} series={series} type="line" width={props.width} />
		</div>
	);
};

LineChart.propTypes = {
	options: PropTypes.shape(),
	series: PropTypes.arrayOf(PropTypes.number).isRequired,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	title: PropTypes.string,
	label: PropTypes.arrayOf(PropTypes.string)
};

LineChart.defaultProps = {
	width: 500,
	title: 'Line Chart',
	label: [],
	options: {}
};
