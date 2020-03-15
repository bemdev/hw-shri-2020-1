const { get, post, remove, cloneRepo } = require('../helpers');

function getBuildList (req, res) {
    const { limit, offset } = req.query;
    get(`https://hw.shri.yandex/api/build/list?limit=${limit}&offset=${offset ? offest : 0}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            if (err) throw err;
        });
};

function sendBuild (req, res) {
    // 'https://hw.shri.yandex/api/build/list'
}

function getBuildById (req, res) {
    // 'https://hw.shri.yandex/api/build/details'

}

function getBuildLogs (req, res) {
    // 'https://hw.shri.yandex/api/build/log'

}

function addBuildToTurn (req, res) {
    // 'https://hw.shri.yandex/api/build/log'

}

function startBuild (req, res) {
    // 'https://hw.shri.yandex/api/build/log'

}

function finishBuild (req, res) {
    // 'https://hw.shri.yandex/api/build/log'

}

function cancelBuild (req, res) {
    // 'https://hw.shri.yandex/api/build/log'

}

function getSettings (req, res) {
    get('https://hw.shri.yandex/api/conf')
        .then(({ data }) => {
            res.send(data);
        })
        .catch(err => {
            if (err) throw err;
        });
}

function saveSettings (req, res) {
    const { repoName } = req.body;
    post('https://hw.shri.yandex/api/conf', req.body)
        .then(({ data }) => {
            cloneRepo(repoName)
                .then(repo => {
                    res.send(repo);
                });
        })
        .catch(err => {
            if (err) throw err;
        });
}

function removeSettings (req, res) {
    remove('https://hw.shri.yandex/api/conf')
        .then(() => res.send('Setting remove.'))
        .catch(err => {
            if (err) throw err;
        });
}

module.exports = {
    getBuildList: getBuildList,
    sendBuild: sendBuild,
    getBuildById: getBuildById,
    getBuildLogs: getBuildLogs,
    addBuildToTurn: addBuildToTurn,
    startBuild: startBuild,
    finishBuild: finishBuild,
    cancelBuild: cancelBuild,
    getSettings: getSettings,
    saveSettings: saveSettings,
    removeSettings: removeSettings
};