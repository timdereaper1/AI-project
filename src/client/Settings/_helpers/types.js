export type Scheme = {
	grade: string,
	min: number,
	max: number
};

export interface SettingsProps {
	setSchemeState: Function;
}

export interface SettingsState {
	scheme: Array<Scheme>;
	isSaved: boolean;
}
