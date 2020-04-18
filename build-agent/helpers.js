const fs = require('fs');
const path = require('path');

const { spawn } = require('child_process');

const axios = require('axios');
const cfg = require('./agent-conf.json');

const agentReady = (port, host) => {
    return axios
        .post(`${cfg.serverHost}:${cfg.serverPort}/notify-agent`, {
            port: port,
            host: host,
        })
        .then(result => {
            console.log('Agent connected');
        })
        .catch(err => {
            console.log(`${cfg.serverHost}:${cfg.serverPort} lost`);
            setTimeout(() => {
                agentReady(port, host);
            }, 1000);
        });
};

const agentStartBuild = (req, res) => {
    const settings = { id, pathToRepo, commitHash, buildCommand, mainBranch } = req.body;

    cloneRepo(settings)
        .then(checkRepo)
        .then(startBuildRepo)
        .then(saveBuild);
};

//Clone git repos to local repo to 'repos' folder
async function cloneRepo(settings) {
    return new Promise(resolve => {
        fs.exists(path.resolve(settings.pathToRepo), match => {
            if (!match) {
                const gc = spawn('git', [
                    'clone',
                    `https://github.com/${settings.pathToRepo.replace('./repos/', '')}`,
                    pathToRepo,
                ]);
                gc.on('close', () => {
                    resolve({
                        ...settings,
                        pathToRepo: pathToRepo,
                    });
                });
            } else {
                resolve({
                    ...settings,
                    pathToRepo: pathToRepo,
                });
            }
        });
    });
}

//Check new commit of local repos
//git reflog --format='%h|%an|%s|%D' | grep a7a2953 -m 1 //%h,%an,%ai,%s
async function checkRepo(settings) {
    return new Promise(resolve => {
        const commits = [];
        const gpull = spawn('git', ['-C', settings.pathToRepo, 'pull']);
        gpull.on('close', () => {
            const gl = spawn('git', [
                '-C',
                settings.pathToRepo,
                'log',
                settings.mainBranch,
                '--format=%h,%an,%ai,%s',
            ]);

            gl.stdout.on('data', data => {
                commits.push(String(data));
            });

            gl.on('close', () => {
                resolve({
                    ...settings,
                    commits: commits.map(commitLine => commitLine.split(',')),
                });
            });
        });
    });
}

//if we want run build remote repos we need install depend
function installDependencys(pathToRepo) {
    return new Promise(resolve => {
        fs.exists(path.resolve(pathToRepo, 'node_modules'), exist => {
            if (!exist) {
                const yi = spawn('yarn', ['install'], {
                    cwd: pathToRepo,
                    checkCWD: true,
                });
                yi.on('close', () => {
                    resolve('install done');
                });
            } else {
                resolve('modules allready install');
            }
        });
    });
}

//Really start build command remote repos
function startBuildRepo({pathToRepo, buildCommand, id}) {
    let log = '';
    return new Promise(resolve => {
        installDependencys(pathToRepo).then(() => {
            const yb = spawn('yarn', [buildCommand], {
                cwd: pathToRepo,
                checkCWD: true,
            });

            yb.stdout.on('data', data => {
                log = String(data);
            });

            yb.stderr.on('data', data => {
                log = String(data);
            });

            yb.on('close', () => {
                resolve({
                    id: id,
                    log: log,
                });
            });
        }).catch(err => console.log(err));
    });
};

function saveBuild (build) {
    return axios
        .post(`${cfg.serverHost}:${cfg.serverPort}/notify-build-result`, build)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    agentReady: agentReady,
    agentStartBuild: agentStartBuild
};
