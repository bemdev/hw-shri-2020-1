import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import routes from '../../routes';

const rootReducer = state => {
	return (state = routes.map(route => {
		if (route.loadData) {
			return {
				data: route.loadData ? route.loadData() : [],
				title: route.title ? route.title() : 'School CI server'
			};
		}
		return {
			data: [],
			title: 'School CI server'
		};
	}));
};
const store = createStore(rootReducer);

function fakeLoading() {
	return <></>;
}

const LoadableComponent = Loadable({
	loader: () => import('../AppPage/AppPage'),
	loading: fakeLoading
});

const App = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Switch>
					{routes.map((route, index) => {
						return (
							<Route key={index} exact={index === 0} {...route}>
								<LoadableComponent view={route.view} />
							</Route>
						);
					})}
				</Switch>
			</Provider>
		</BrowserRouter>
	);
};

export default App;
