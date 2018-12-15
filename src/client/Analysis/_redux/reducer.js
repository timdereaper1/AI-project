import { Action } from '../../_shared/services';
import { Constants } from '../_helpers';

const defaultState = {
	state: null
};

export default (state: any = defaultState, action: Action) => {
	switch (action.type) {
		case Constants.types.ESSAY_RESULTS:
			return { ...state, state: action.payload };
		default:
			return state;
	}
};
