import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes from '../../routes';
import Page from '../AppPage/AppPage.js';

const initialState = {
	title: 'School CI server'
};

const rootReducer = (state = [], action) => {
	switch (action.type) {
		case 'MODAL_OPEN':
			return {
				...state,
				modal: {
					active: true,
					content: action.payload
				}
			};
		default:
			return state;
	}
};

const store = createStore(rootReducer, initialState);

const App = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Switch>
					{routes.map((route, index) => {
						return (
							<Route key={index} exact={route.exact} {...route}>
								<Page
									view={route.view}
									data={route.loadData && route.loadData()}
									title={route.title && route.title()}
								/>
							</Route>
						);
					})}
				</Switch>
			</Provider>
		</BrowserRouter>
	);
};

export default App;
