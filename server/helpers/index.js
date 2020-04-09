require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const https = require('https');
const axios = require('axios');

const options = {
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
    headers: {
        Authorization: 'Bearer ' + process.env.TOKEN,
        // 'Content-Type': 'application/json;charset=utf-8'
    },
};

//Some wrappers axios - get - post - remove
function get(url) {
    return axios.get(url, options);
}

function post(url, data) {
    return axios.post(url, data, options);
}

function remove(url) {
    return axios.delete(url, options);
}

//if we want run build remote repos we need install depend
function installDependencys(truePath) {
    return new Promise(resolve => {
        fs.exists(path.resolve(truePath, 'node_modules'), exist => {
            if (!exist) {
                const yi = spawn('yarn', ['install'], {
                    cwd: truePath,
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
function startBuildRepo(settings) {
    const truePath = path.resolve(__dirname, '../../', settings.pathToRepo);
    let log = '';

    return new Promise(resolve => {
        installDependencys(truePath).then(() => {
            const yb = spawn('yarn', ['build'], {
                cwd: truePath,
                checkCWD: true,
            });

            yb.stdout.on('data', data => {
                log = String(data);
            });

            yb.on('close', () => {
                resolve(log);
            });
        });
    });
}

//Clone git repos to local repo to 'repos' folder
async function cloneRepo(settings) {
    const pathToRepo = `./repos/${settings.repoName}`;
    return new Promise(resolve => {
        fs.exists(path.resolve(__dirname, '../../', pathToRepo), match => {
            if (!match) {
                const gc = spawn('git', [
                    'clone',
                    `https://github.com/${settings.repoName}`,
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
async function checkRepo(repo) {
    return new Promise(resolve => {
        const commits = [];
        const gpull = spawn('git', ['-C', repo.pathToRepo, 'pull']);
        gpull.on('close', () => {
            const gl = spawn('git', [
                '-C',
                repo.pathToRepo,
                'log',
                repo.mainBranch,
                '--format=%h,%an,%ai,%s',
            ]);

            gl.stdout.on('data', data => {
                commits.push(String(data));
            });

            gl.on('close', () => {
                resolve({
                    ...repo,
                    commits: commits.map(commitLine => commitLine.split(',')),
                });
            });
        });
    });
}

function statsToAssets({ entrypoints }) {
    return Object.keys(entrypoints).reduce((map, key) => {
        if (!map[key]) {
            map[key] = {};
        }

        entrypoints[key].assets.forEach(file => {
            let ext = file.split('.').pop();

            if (!map[key][ext]) {
                map[key][ext] = file;
            }
        });

        return map;
    }, {});
}

module.exports = {
    get: get,
    post: post,
    remove: remove,
    cloneRepo: cloneRepo,
    checkRepo: checkRepo,
    startBuildRepo: startBuildRepo,
    statsToAssets: statsToAssets,
};
