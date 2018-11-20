import { Analysis, POSDetails } from './interface';

interface EssayResult {
	values: {
		pos: {}
	};
}

const POS_FILTER: Array<string> = ['FW', 'EX', 'LS', 'PDT', 'RP', 'TO', 'WDT', 'WP', 'WP$', 'WRB'];
const ESSAY_FILTER: Array<string> = ['pos', 'analysis'];

export const filterEssayResults = (result: EssayResult): { essay: Analysis, pos: Analysis } => {
	const generalLabels: Array<string> = Object.keys(result.values).filter(
		val => !ESSAY_FILTER.includes(val)
	);
	const generalValues: Array<number> = generalLabels.map(label => result.values[label]);

	const posLabels: Array<string> = Object.keys(result.values.pos).filter(
		val => !POS_FILTER.includes(val)
	);
	const posValues: Array<number> = posLabels.map(val => result.values.pos[val]);

	return {
		essay: {
			series: [...generalValues, posValues.reduce((acc, val) => acc + val, 0)],
			labels: [...generalLabels, 'pos']
		},
		pos: {
			series: posValues,
			labels: posLabels
		}
	};
};

export const merge = (
	labels: Array<string>,
	values: Array<number>
): Array<{ key: string, index: number, value: number }> => {
	if (labels.length !== values.length) throw Error('Both arrays must have the same length');
	return labels.map((label, index) => ({ key: label, index, value: values[index] }));
};

export const getPOSResultDetails = (
	pos: {},
	labels: string[],
	values: number[]
): Array<POSDetails> => {
	return labels.map((label, index) => ({
		abbr: label,
		key: pos[label].name,
		desc: pos[label].description,
		value: values[index],
		index
	}));
};
