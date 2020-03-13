// GET /api/settings — получение сохраненных настроек
// POST /api/settings - cохранение настроек
// GET  /api/builds - получение списка сборок
// POST /api/builds/:commitHash - добавление сборки в очередь
// GET  /api/builds/:buildId - получение информации о конкретной сборке
// GET  /api/builds/:buildId/logs - получение логов билда (сплошной текст)
// _______________________________________________________________________

const initializeEntrypoints = (app) => {
    app.get('/api/settings', (req, res) => {
        res.end('ok');
    });
    app.post('/api/settings', (req, res) => {
        res.end('ok');
    });
    app.get('/api/builds', (req, res) => {
        res.end('ok');
    });
    app.post('/api/builds/:commitHash', (req, res) => {
        res.end('ok');
    });
    app.get('/api/builds/:buildId', (req, res) => {
        res.end('ok');
    });
    app.get('/api/builds/:buildId/logs', (req, res) => {
        res.end('ok');
    });
};

module.exports = initializeEntrypoints;
