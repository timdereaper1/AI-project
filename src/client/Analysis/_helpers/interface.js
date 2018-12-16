export interface ChartProps {
	options?: {};
	series: Array<number>;
	width?: number | string;
	title?: string;
	labels?: Array<string>;
}

export interface Analysis {
	series: Array<number>;
	labels: Array<string>;
}

export interface POSDetails {
	abbr: string;
	key: string;
	desc: string;
	value: number;
	index: number;
}

export interface MergeRes {
	key: string;
	index: number;
	value: number;
}

export interface AnalysisData {
	key: string;
	index: number;
	value: number;
	abbr?: string;
	desc?: string;
}
