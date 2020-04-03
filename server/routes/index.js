const mcache = require('memory-cache');
const {
	getBuildList,
	getBuildById,
	getBuildLogs,
	addBuildToTurn,
	startBuild,
	finishBuild,
	cancelBuild,
	getSettings,
	saveSettings,
	removeSettings,
} = require('../controllers');

//Cacheware - if u want change memory cache but he removable
const cacheMiddleware = (duration) => {
	return (req, res, next) => {
		const key = '__express__' + req.originalUrl || req.url;
		let cachedBody = mcache.get(key);
		if (cachedBody) {
			res.send(cachedBody);
			return;
		} else {
			res.sendResponse = res.send;
			res.send = (body) => {
				mcache.put(key, body, duration * 60000);
				res.sendResponse(body);
			};
		}
		next();
	};
};

const initializeEntrypoints = (app) => {
	app.get('/api/builds/list', getBuildList);
	app.get('/api/builds/:buildId', getBuildById);
	app.get('/api/builds/:buildId/logs', cacheMiddleware(15), getBuildLogs);

	app.post('/api/build/request', addBuildToTurn);
	app.post('/api/build/start', startBuild);
	app.post('/api/build/finish', finishBuild);
	app.post('/api/build/cancel', cancelBuild);

	app
		.route('/api/settings')
		.get(cacheMiddleware(30), getSettings)
		.post(saveSettings)
		.delete(removeSettings);
};

module.exports = initializeEntrypoints;
