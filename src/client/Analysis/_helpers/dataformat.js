interface EssayResult {
	values: {
		pos: {}
	};
}

const POS_FILTER: string[] = ['FW', 'EX', 'LS', 'PDT', 'RP', 'TO', 'WDT', 'WP', 'WP$', 'WRB'];
const ESSAY_FILTER: string[] = ['pos', 'analysis'];

export const filterEssayResults = (result: EssayResult): {} => {
	const generalLabels: string[] = Object.keys(result.values).filter(
		val => !ESSAY_FILTER.includes(val)
	);
	const generalValues: number[] = generalLabels.map(label => result.values[label]);

	const posLabels: string[] = Object.keys(result.values.pos).filter(
		val => !POS_FILTER.includes(val)
	);
	const posValues: number[] = posLabels.map(val => result.values.pos[val]);

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

export const merge = (labels: string[], values: number[]): Array<{}> => {
	if (labels.length !== values.length) throw Error('Both arrays must have the same length');
	return labels.map((label, index) => ({ key: label, index, value: values[index] }));
};

export const posList = (pos: {}, labels: string[], values: number[]): Array<{}> => {
	return labels.map((label, index) => ({
		abbr: label,
		key: pos[label].name,
		desc: pos[label].description,
		value: values[index],
		index
	}));
};
