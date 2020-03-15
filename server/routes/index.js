const { 
    getBuildList,
    sendBuild,
    getBuildById,
    getBuildLogs,
    addBuildToTurn,
    startBuild,
    finishBuild,
    cancelBuild,
    getSettings,
    saveSettings,
    removeSettings
} = require('../controllers');

const initializeEntrypoints = (app) => {

    app.get('/api/builds/list', getBuildList)
    // app.post('/api/builds/:commitHash', sendBuild);
    app.get('/api/builds/:buildId', getBuildById);
    app.get('/api/builds/:buildId/logs', getBuildLogs);

    app.post('/api/build/request', addBuildToTurn);
    app.post('/api/build/start', startBuild);
    app.post('/api/build/finish', finishBuild);
    app.post('/api/build/cancel', cancelBuild);

    app.route('/api/settings')
        .get(getSettings)
        .post(saveSettings)
        .delete(removeSettings);
};

module.exports = initializeEntrypoints;
