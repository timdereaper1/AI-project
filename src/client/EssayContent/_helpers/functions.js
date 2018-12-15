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
	return scheme ? scheme.filter(val => score >= val.min && score <= val.max)[0].grade : null;
};
