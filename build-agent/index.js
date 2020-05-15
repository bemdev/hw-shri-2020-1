const express = require('express');
const { agentReady, agentStartBuild } = require('./controller.js');

const app = express();
app.use(express.json());

//запустить сборку. В параметрах — id сборки, адрес репозитория, хэш коммита, команда, которую надо запустить
app.post('/build', agentStartBuild);

app.all('*', (req, res) => res.send(404));
app.listen(process.env.PORT, () => {
    console.log(`Build Server start on ${process.env.PORT}.`);
});

//отправить статус готовности билд агента
agentReady(process.env.PORT, 'http://localhost');