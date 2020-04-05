const { resolve, join } = require('path');
const express = require('express');
const morgan = require('morgan');
const entrypoints = require('./routes');

const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swagger.json');

const webpack = require('webpack');
const { statsToAssets } = require('./helpers/');

const app = express();

//We need crossdomain set headers for this work
let allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', 'GET POST DELETE OPTIONS');
	next();
};

app.use(allowCrossDomain);
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(resolve(__dirname, '../public/client/')));

//Get webpack configs
const clientConfig = require('../config/client.config');
const serverConfig = require('../config/server.config');
const config = require('../config/config').commonConfig();

//Create var to assets
let clientAssetsMap;
let serverAssetsMap;

//Start dua compilers
const compilers = webpack([clientConfig, serverConfig]);

//Wait webpack hooks done and save assets
compilers.hooks.done.tap('Dev Server', (stats) => {
	clientAssetsMap = statsToAssets(stats.stats[0].toJson());
	serverAssetsMap = statsToAssets(stats.stats[1].toJson());
});

//Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

//all server api entry apply to app
entrypoints(app);

//Use REACT middleware
app.use((req, res, next) => {
	const serverBundle = require(join(
		serverConfig.output.path,
		serverAssetsMap.main.js
	));
	try {
		let middleware = serverBundle.default({ assets: clientAssetsMap });
		middleware(req, res, next);
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
});

let serverWatch = compilers.watch({ aggregateTimeout: 0 }, (err, stats) => {
	if (err) {
		console.log(err);
	}
});

let server = app.listen(config.port, () => {
	console.log(`Server started at http://localhost:${config.port}`);
});

['SIGINT', 'SIGTERM'].forEach(function (sig) {
	process.on(sig, function () {
		serverWatch.close();
		server.close();
		process.exit();
	});
});
