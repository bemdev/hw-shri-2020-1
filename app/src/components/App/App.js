import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redusers';

import routes from '../../routes';
import Switch from '../Switch/Switch.js';

const store = createStore(rootReducer);

const App = () => {
	return (
        <Provider store={store}>
            <Switch
                config={routes}
                href={window.location.pathname}
            />
        </Provider>
	);
};

export default App;
