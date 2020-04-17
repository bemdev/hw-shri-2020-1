const express = require('express');
const { port } = require('./server-conf.json');
const { notifyAgent, notifyBuildResult } = require('./controller.js');
const { checkTask } = require('./helpers.js');

const app = express();
app.use(express.json());

let agents = [];
//зарегистрировать агента . В параметрах хост и порт, на котором запущен агент
app.post('/notify-agent', (req, res) => {
    const { port, host } = req.body;
    agents = notifyAgent(port, host, agents);
    res.send('ok');
});

//сохранить результаты сборки. В параметрах — id сборки, статус, лог (stdout и stderr процесса).
app.post('/notify-build-result', notifyBuildResult);

app.all('*', (req, res) => res.send(404));

app.listen(port, () => {
    console.log(`Build Server start on ${port}.`);
});

let interval = setInterval(() => {
    if (agents.length > 0) {
        clearInterval(interval);
        checkTask(agents)
    }
}, 3000);