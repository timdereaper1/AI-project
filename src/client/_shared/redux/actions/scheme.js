import { Action } from 'redux';
import { GradeScheme, Action as IAction } from '../../services';
import { Constants } from '../../constants';

export const setSchemeState = (): Action<IAction> => {
	if (localStorage.getItem(Constants.keys.store.GRADE_SCHEME)) {
		let data: Array<GradeScheme> = JSON.parse(
			window.localStorage.getItem(Constants.keys.store.GRADE_SCHEME)
		);
		data = data.map((val: GradeScheme) => ({
			...val,
			min: parseInt(val.min),
			max: parseInt(val.max)
		}));
		return {
			type: Constants.types.HAS_SCHEME,
			payload: data
		};
	}
	return {
		type: Constants.types.NO_SCHEME,
		payload: null
	};
};
