import { submitEssay } from '../../_shared/services';

export const submitEssayForm = async (html: string, title: string): Promise<any> => {
	const data = html
		.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, '\n')
		.replace(/<\/?[^>]+(>|$)/g, '')
		.trim();
	const result = await submitEssay(data);
	return result;
};
