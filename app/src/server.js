import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Router } from 'express';

import { matchRoutes } from './libs/router';

import routes from './routes';
import Switch from './components/Switch/Switch';

import pageTemplate from '../../config/template';
import store from './store';

export default function createMiddleware({ assets }) {
	async function renderHtml(req) {
		const { settings, data } = matchRoutes(routes, req.url);

		let serverData;
		let setting;

		try {
			typeof data === 'function'
				? (serverData = await data(req.params))
				: (serverData = await data);

			typeof settings === 'function'
				? (setting = await settings())
				: (setting = await settings);
			setting = setting.data;
		} catch (error) {
			console.log(error);
		}

		const content = renderToString(
			<Provider store={store({ ...serverData, setting })}>
				<Switch config={routes} href={req.url} />
			</Provider>
		);

		return pageTemplate({
			css: assets.main.css,
			js: assets.main.js,
			body: content,
			data: JSON.stringify({ ...serverData, setting }),
		});
	}

	let appRouter = Router();

	appRouter.get('/', (req, res) => {
		renderHtml(req).then((page) => res.send(page));
	});

	appRouter.get('/settings', (req, res) => {
		renderHtml(req).then((page) => res.send(page));
	});

	appRouter.get('/history', (req, res) => {
		renderHtml(req).then((page) => res.send(page));
	});

	appRouter.get('/detail/:buildId/log', (req, res) => {
		renderHtml(req).then((page) => res.send(page));
	});

	return appRouter;
}
