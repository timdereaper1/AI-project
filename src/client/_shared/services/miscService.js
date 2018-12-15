export const score = (val: number, maxVal?: number = 60): number => {
	const res = Math.floor(val);
	return res < 0 ? 0 : res > 100 ? 91 : res;
};
