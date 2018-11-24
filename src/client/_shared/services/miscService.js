export const score = (val: number, maxVal?: number = 60): number => {
	return Math.floor((val / maxVal) * 100);
};
