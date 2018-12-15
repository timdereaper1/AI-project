import { Action } from '../../_shared/services';
import { Constants } from './types';

const defaultState = {
	scheme: null
};

export default (state: any = defaultState, action: Action) => {
	switch (action.type) {
		case Constants.HAS_SCHEME:
			return { ...state, scheme: action.payload };
		case Constants.NO_SCHEME:
			return { ...state, ...defaultState };
		default:
			return state;
	}
};
