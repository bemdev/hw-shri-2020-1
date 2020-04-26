import mcache from 'memory-cache';
import { NextFunction, Application } from 'express';

import {
    getBuildList,
    getBuildById,
    getBuildLogs,
    addBuildToTurn,
    cancelBuild,
    getSettings,
    saveSettings,
    removeSettings,
} from '../controllers';

type cacheResponseType = { send: (cache: []) => void, sendResponse?(body:[]): void };
type requestCache = { originalUrl?: string,  url: string };

//Cacheware - if u want change memory cache but he removable
const cacheMiddleware = (duration:number)=> {
    return (req: requestCache, res: cacheResponseType, next: NextFunction) => {
        const key = '__express__' + req.originalUrl || req.url;

        let cachedBody:[] = mcache.get(key);

        if (cachedBody) {
            res.send(cachedBody);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = body => {
                mcache.put(key, body, duration * 60000);
                res.sendResponse && res.sendResponse(body);
            };
        }

        next();
    };
};

const initializeEntrypoints = (app:Application) => {
    app.get('/api/builds/list', getBuildList);
    app.get('/api/builds/:buildId', getBuildById);
    app.get('/api/builds/:buildId/logs', cacheMiddleware(30), getBuildLogs);

    app.post('/api/build/request', addBuildToTurn);
    app.post('/api/build/cancel', cancelBuild);

    app.route('/api/settings')
        .get(getSettings)
        .post(saveSettings)
        .delete(removeSettings);
};  

export default initializeEntrypoints;