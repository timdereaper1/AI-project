import React from 'react';
import PropTypes from 'prop-types';
import ApexCharts from 'react-apexcharts';
import { Header } from 'semantic-ui-react';
import './css/chart.css';

type PerformanceChartProps = {
	data: Array<{ name: string, data: Array<number> }>
};

const PerformanceChart: React.FunctionComponent<PerformanceChartProps> = props => {
	const options = {};
	return props.data ? (
		<section className="ovw-section">
			<div className="perf-chart">
				<Header size="large" className="p-title">
					AMA Performance
				</Header>
				<p className="desc">
					The chart shows how AMA performed when marking 100 essays with examiners scores
					for each essay.
				</p>
				<div className="p-widget">
					<ApexCharts options={options} series={props.data} width={720} height={400} />
				</div>
			</div>
		</section>
	) : null;
};

PerformanceChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			data: PropTypes.arrayOf(PropTypes.number)
		})
	).isRequired
};

export default PerformanceChart;
