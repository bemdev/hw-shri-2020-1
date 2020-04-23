import { resolve, join } from 'path'
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import entrypoints from './routes';

import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './swagger.json';

import webpack from 'webpack';
import { statsToAssets } from './helpers/'

const app = express();

//We need crossdomain set headers for this work
let allowCrossDomain = function(req: Request, res: Response, next: NextFunction) {
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
import config from '../config/config';
import clientConfig from '../config/client.config';
import serverConfig from '../config/server.config';

//Create var to assets
let clientAssetsMap;
let serverAssetsMap;

//Start dua compilers
const compilers = webpack([clientConfig, serverConfig]);

//Wait webpack hooks done and save assets
compilers.hooks.done.tap('Dev Server', stats => {
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
        serverAssetsMap.main.js,
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