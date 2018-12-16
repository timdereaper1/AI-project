export interface Action {
	type: string;
	payload?: any;
}

export interface GradeScheme {
	grade: string;
	min: number;
	max: number;
}
