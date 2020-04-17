const {
    get,
    post,
    remove,
    cloneRepo,
    checkRepo,
    startBuildRepo,
    initBuildWorker,
} = require('../helpers');

//Get a list of all builds
function getBuildList(req, res) {
    return new Promise(resolve => {
        const { limit, offset } = req.query;
        get(
            `https://hw.shri.yandex/api/build/list?limit=${limit}&offset=${
                offset ? offset : 0
            }`,
        ) //need fix this but it work
            .then(response => {
                if (res) {
                    res.send(response.data);
                } else {
                    resolve(response.data);
                }
            })
            .catch(err => {
                if (err) res.send([]);
            });
    });
}

//Get a build by id
function getBuildById(req, res) {
    const { buildId } = req.query;
    get(`https://hw.shri.yandex/api/build/details?buildId=${buildId}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            if (err) res.send([]);
        });
}

//Get build full log of remote repo make
function getBuildLogs(req, res) {
    const { buildId } = req.query;
    get(`https://hw.shri.yandex/api/build/log?buildId=${buildId}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            if (err) res.send([]);
        });
}

//Add build to turn by req.body
function addBuildToTurn(req, res) {
    post('https://hw.shri.yandex/api/build/request', req.body) //need fix this but it work
        .then(response => {
            if (res) res.send('Build waiting');
        })
        .catch(err => {
            if (err) {
                throw err;
            }
        });
}

//Start build with settings (its need for really start build remote repos).
//will change build.start to custom properties
function startBuild(build, settings) {
    const start = Date.now();

    return new Promise(resolve => {
        post('https://hw.shri.yandex/api/build/start', {
            buildId: build.id,
            dateTime: new Date().toISOString(),
        })
            .then(() => {
                startBuildRepo(settings).then(log =>
                    resolve({ log: log, startTime: start }),
                );
            })
            .catch(err => {
                if (err) throw err;
            });
    });
}

//Finish build, send log, change status, calc duration
function finishBuild(build, log, startTime) {
    const end = Date.now();
    const elaps = end - startTime;

    return post('https://hw.shri.yandex/api/build/finish', {
        buildId: build.id,
        duration: elaps,
        success: true,
        buildLog: log,
    }).catch(err => {
        if (err) throw err;
    });
}

//Cancel build by ID with any status
function cancelBuild(build) {
    //return 500 error ? dont cancel build plz
    post('https://hw.shri.yandex/api/build/cancel', {
        buildId: build.id,
    }).catch(err => {
        if (err) throw err;
    });
}

//Multi get setting profile - clone and check repo
function getSettings(req, res) {
    return get('https://hw.shri.yandex/api/conf')
        .then(({ data }) => {
            return cloneRepo(data.data)
                .then(checkRepo)
                .then(commits => {
                    const dataToSend = { data: commits };
                    if (res) {
                        res.send(dataToSend);
                    } else {
                        return dataToSend;
                    }
                });
        })
        .catch(err => {
            if (err) res.send([]);
        });
}

//Multi save settings - clone check and add to turn - mb ref this
function saveSettings(req, res, next) {
    post('https://hw.shri.yandex/api/conf', req.body)
        .then(response => {
            cloneRepo(req.body)
                .then(checkRepo)
                .then(infoCommits => {
                    const firstCommit = infoCommits.commits[0]; //fix this [0][2]
                    addBuildToTurn({
                        body: {
                            commitMessage: firstCommit[3],
                            commitHash: firstCommit[0],
                            branchName: infoCommits.mainBranch,
                            authorName: firstCommit[1],
                        },
                    });
                    res.send(infoCommits);
                })
                .catch(err => {
                    if (err) throw err;
                });
        })
        .catch(err => {
            if (err) throw err;
        });
}

//Remove settings profile - delete all build history
function removeSettings(req, res) {
    remove('https://hw.shri.yandex/api/conf')
        .then(() => res.send('Setting remove.'))
        .catch(err => {
            if (err) throw err;
        });
}

module.exports = {
    getBuildList: getBuildList,
    getBuildById: getBuildById,
    getBuildLogs: getBuildLogs,
    addBuildToTurn: addBuildToTurn,
    startBuild: startBuild,
    finishBuild: finishBuild,
    cancelBuild: cancelBuild,
    getSettings: getSettings,
    saveSettings: saveSettings,
    removeSettings: removeSettings,
};
