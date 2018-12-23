import { Action } from '../../_shared/services';
import { Constants } from '../../_shared/constants';

const defaultState = {
	scheme: null
};

export default (state: any = defaultState, action: Action) => {
	switch (action.type) {
		case Constants.types.HAS_SCHEME:
			return { ...state, scheme: action.payload };
		case Constants.types.NO_SCHEME:
			return { ...state, ...defaultState };
		default:
			return state;
	}
};
