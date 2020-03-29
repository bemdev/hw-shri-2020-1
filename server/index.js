const path = require('path');
const express = require('express');
const morgan = require('morgan');
const entrypoints = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swagger.json');

const app = express();

let allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', 'GET POST DELETE OPTIONS');
	next();
};

app.use(allowCrossDomain);
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../examples')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

entrypoints(app);

app.listen(3010, server => {
	console.log('CI Server start on 3010 port');
});
