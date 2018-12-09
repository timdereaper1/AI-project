import { Analysis, POSDetails, MergeRes } from './interface';
import { Constants as K } from './constants';

export const getDataValues = (data: {}): Array<any> => Object.keys(data).map(val => data[val]);

export const getDataKeys = (data: {}): Array<string> => Object.keys(data).map(val => val);

type key = 'words' | 'senc' | 'para';

export const dataAnalysis = (data: any, t?: key = 'words'): {} => {
	const vals = Object.keys(data).reduce((acc, val) => {
		if (K.analysis[t].includes(val)) {
			acc[val] = data[val];
		}
		return acc;
	}, {});
	vals.other = vals['total words'] - (vals['total long words'] + vals['total short words']);
	return {
		'total short words': vals['total short words'],
		'total long words': vals['total long words'],
		other: vals.other
	};
};

export const filterEssayResults = (result: any): { essay: Analysis, pos: Analysis } => {
	const scoreLabels = Object.keys(result.values).filter(val => !K.filter.RES.includes(val));
	const scoreValues = scoreLabels.map(label => result.values[label]);
	const posLabels = Object.keys(result.values.pos).filter(val => !K.filter.POS.includes(val));
	const posValues = posLabels.map(val => result.values.pos[val]);
	return {
		essay: {
			series: [...scoreValues, posValues.reduce((acc, val) => acc + val, 0)],
			labels: [...scoreLabels, 'pos']
		},
		pos: {
			series: posValues,
			labels: posLabels
		}
	};
};

export const merge = (labels: string[], values: number[]): MergeRes[] => {
	if (labels.length !== values.length) throw Error('Both arrays must have the same length');
	return labels.map((label, index) => ({ key: label, index, value: values[index] }));
};

export const posScoreInfo = (pos: {}, labels: string[], values: number[]): POSDetails[] => {
	return labels.map((label, index) => ({
		abbr: label,
		key: pos[label].name,
		desc: pos[label].description,
		value: values[index],
		index
	}));
};

export const overallScores = (data: any): { label: string[], value: number[] } => {
	return data.labels.reduce(
		(acc, label, index) => {
			if (K.overall.scores.includes(label)) {
				acc.label.push(label);
				acc.value.push(data.series[index]);
			} else if (K.overall.misc.includes(label)) {
				if (acc.label.includes('misc')) {
					const _index = acc.label.findIndex(val => val === 'misc');
					acc.value[_index] += data.series[index];
				} else {
					acc.label.push('misc');
					acc.value.push(data.series[index]);
				}
			}
			return acc;
		},
		{ label: [], value: [] }
	);
};

export const miscScores = (data: {}): { label: string[], value: number[] } => {
	return data.labels.reduce(
		(acc, label, index) => {
			if (K.overall.misc.includes(label)) {
				acc.label.push(label);
				acc.value.push(data.series[index]);
			}
			return acc;
		},
		{ label: [], value: [] }
	);
};
