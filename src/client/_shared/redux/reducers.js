import { combineReducers } from 'redux';
import analysis from '../../Analysis/_redux/reducer';
import dashboard from '../../Dashboard/_redux/reducer';

export default combineReducers({
	analysis,
	dashboard
});
