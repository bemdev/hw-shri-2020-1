import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Router } from 'express';

import { matchRoutes } from './libs/router';
import { pseudoThunk } from './libs/thunk';

import routes from './routes';
import Switch from './components/Switch/Switch';

import pageTemplate from '../../config/template';
import store from './store';

export default function createMiddleware({ assets }) {
    async function renderHtml(req, res) {
        const { settings, data } = matchRoutes(routes, req.url);
        let serverData;

        serverData = await Promise.all([
            pseudoThunk(data, req.params),
            pseudoThunk(settings, req.params, true),
        ]);

        serverData = {
            ...serverData[0],
            ...serverData[1],
        };

        //if we no have settings go to set
        if (!serverData.settings) return res.redirect('/');

        const content = renderToString(
            <Provider store={store({ ...serverData })}>
                <Switch config={routes} href={req.url} />
            </Provider>,
        );

        return pageTemplate({
            css: assets.main.css,
            js: assets.main.js,
            body: content,
            data: JSON.stringify({ ...serverData }),
        });
    }

    let appRouter = Router();

    appRouter.get(routes.map(r => r.path), (req, res) => {
        renderHtml(req, res).then(page => res.send(page));
    });

    return appRouter;
}
