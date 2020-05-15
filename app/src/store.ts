import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer as settings } from './redusers';
import { modalReduser as modal } from './redusers';
import { dataReducer as data } from './redusers';

const redusers = combineReducers({
    settings,
    data,
    modal,
});

export default (initialState:{}) => {
    return createStore(redusers, { ...initialState }, composeWithDevTools());
};
