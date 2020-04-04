import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer as setting } from './redusers';
import { modalReduser as modal } from './redusers';
import { dataReducer as data } from './redusers';

const redusers = combineReducers({
	setting,
	data,
	modal,
});

export default (initialState) => {
	return createStore(redusers, { ...initialState }, composeWithDevTools());
};
