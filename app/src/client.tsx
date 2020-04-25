import * as React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';

import routes from './routes';
import Switch from './components/Switch/Switch';

import store from './store';

const restoredData = (function clientRestoreData() {
	let element = document.getElementById('data');
	if (element && element.textContent) {
		return JSON.parse(element.textContent.replace(/&lt;/g, '<'));
	} else {
		return {};
	}
})();

function removeElement(elementId:string) {
	var element = document.getElementById(elementId);
	element && element.remove();
}

removeElement('data');

hydrate(
	<Provider store={store(restoredData)}>
		<Switch config={routes} href={window.location.pathname} />
	</Provider>,
	document.getElementById('root')
);
