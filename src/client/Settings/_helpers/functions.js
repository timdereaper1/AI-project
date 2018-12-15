import { Constants } from './constants';

export const getGradeChar = (char: string): string => {
	const chars = Constants.CHARS.split('');
	const index = chars.findIndex(val => val === char);
	return chars[index + 1];
};
