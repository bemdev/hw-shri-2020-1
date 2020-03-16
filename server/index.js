const path = require('path');
const express = require('express');
const entrypoints = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swagger.json');

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../build')))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

entrypoints(app);

app.listen(3000, (server) => {
    console.log('CI Server start on 3000 port');
});
