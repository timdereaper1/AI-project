export interface EssayContentProps {
	setResults: Function;
	scheme?: Array<{}>;
	history: any;
}

export interface EssayContentState {
	data: string;
	details: Array<{}>;
	open: boolean;
	grade: string;
	title: string;
	result: any;
	alert: boolean;
	message: string;
}
