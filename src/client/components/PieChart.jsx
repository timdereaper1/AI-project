import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { ChartProps } from './_helpers';
import './css/chart.css';

export const PieChart: React.FunctionComponent<ChartProps> = (props: ChartProps) => {
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
		},
		legend: {
			position: 'bottom'
		}
	};

	return (
		<div className="chart-block">
			<Chart options={options} series={props.series} type="pie" width={props.width} />
		</div>
	);
};

PieChart.propTypes = {
	options: PropTypes.shape(),
	series: PropTypes.arrayOf(PropTypes.number).isRequired,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	title: PropTypes.string,
	label: PropTypes.arrayOf(PropTypes.string)
};

PieChart.defaultProps = {
	width: 380,
	title: 'Pie Chart',
	label: [],
	options: {}
};
