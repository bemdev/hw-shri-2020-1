const {
	get,
	post,
	remove,
	cloneRepo,
	checkRepo,
    startBuildRepo,
	initBuildWorker
} = require('../helpers');

function getBuildList(req, res) {
	return new Promise(resolve => {
		const { limit, offset } = req.query;
		get(
			`https://hw.shri.yandex/api/build/list?limit=${limit}&offset=${
				offset ? offest : 0
			}`
		) //need fix this but it work
			.then(response => {
				if (res) {
					res.send(response.data);
				} else {
					resolve(response.data);
				}
			})
			.catch(err => {
				if (err) throw err;
			});
	});
}

function getBuildById(req, res) {
	const { buildId } = req.query;
	get(`https://hw.shri.yandex/api/build/details?buildId=${buildId}`)
		.then(response => {
			res.send(response.data);
		})
		.catch(err => {
			if (err) throw err;
		});
}

function getBuildLogs(req, res) {
	const { buildId } = req.query;
	get(`https://hw.shri.yandex/api/build/log?buildId=${buildId}`)
		.then(response => {
			res.send(response.data);
		})
		.catch(err => {
			if (err) console.log(err);
		});
}

function addBuildToTurn(req, res) {
	post('https://hw.shri.yandex/api/build/request', req.body) //need fix this but it work
		.then(response => {
			if (res) res.send('Build waiting');
		})
		.catch(err => {
            if (err) {
                throw err;
            };
		});
}

function startBuild(build, settings) {
    startBuildRepo(settings)
        .then(result => {
            console.log(result);
        })

	// return post('https://hw.shri.yandex/api/build/start', {
	// 	buildId: build.id,
	// 	dateTime: build.start
	// }).catch(err => {
	// 	if (err) throw err;
	// });
}

function finishBuild(build) {
	post('https://hw.shri.yandex/api/build/finish', {
		buildId: build.id,
		duration: 0,
		success: true,
		buildLog: 'string'
	}).catch(err => {
		if (err) throw err;
	});
}

function cancelBuild(build) {
	//return 500 error ? dont cancel build plz
	post('https://hw.shri.yandex/api/build/cancel', {
		buildId: build.id
	}).catch(err => {
		if (err) throw err;
	});
}

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
                })
		})
		.catch(err => {
			if (err) throw err;
		});
}

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
                            authorName: firstCommit[1]
                        }
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
	removeSettings: removeSettings
};
