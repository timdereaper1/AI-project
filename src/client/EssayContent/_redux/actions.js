import { Action } from '../../_shared/services';
import { Constants } from '../../_shared/constants';

export const setResults = (data: any): Action => ({
	type: Constants.types.ESSAY_RESULTS,
	payload: data
});
