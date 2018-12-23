import { submitEssay } from '../../_shared/services';

type Scheme = {
	grade: string,
	min: number,
	max: number
};

export const submitEssayForm = async (html: string, title?: string): Promise<any> => {
	const data = html
		.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, '\n')
		.replace(/<\/?[^>]+(>|$)/g, '')
		.trim();
	const result = await submitEssay(data);
	return result;
};

export const getGrade = (score: number, scheme: Array<Scheme>): string => {
	try {
		const grades = scheme.filter(val => score >= val.min && score <= val.max);
		return scheme && grades ? grades[0].grade : null;
	} catch (e) {
		return null;
	}
};
