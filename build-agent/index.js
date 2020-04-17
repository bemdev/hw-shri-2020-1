const express = require('express');
const { port } = require('./agent-conf.json');
const { agentReady, agentStartBuild } = require('./helpers.js');

const app = express();
app.use(express.json());

//запустить сборку. В параметрах — id сборки, адрес репозитория, хэш коммита, команда, которую надо запустить
app.post('/build', agentStartBuild);

app.all('*', (req, res) => res.send(404));
app.listen(port, () => {
    console.log(`Build Server start on ${port}.`);
});

//отправить статус готовности билд агента
agentReady(port, 'http://localhost');