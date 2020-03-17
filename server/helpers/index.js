require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const https = require('https');
const axios = require('axios');

const options = {
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    headers: { 'Authorization': 'Bearer ' + process.env.TOKEN }
};

function get(url) {
    return axios.get(url, options);
}

function post(url, data) {
    return axios.post(url, data, options);
}

function remove(url) {
    return axios.delete(url, options);
}

async function cloneRepo (settings) {
    const pathToRepo = `./repos/${settings.repoName}`;
    return new Promise(resolve => {
        fs.exists(path.resolve(__dirname, '../../', pathToRepo), (match) => {
            if (!match) {
                const gc = spawn('git', ['clone', `https://github.com/${settings.repoName}`, pathToRepo]);
                gc.on('close', () => {
                    resolve({
                        ...settings,
                        pathToRepo: pathToRepo
                    }) 
                })
            } else {
                resolve({
                    ...settings,
                    pathToRepo: pathToRepo
                });
            }
        });
        
    });
}

//git reflog --format='%h|%an|%s|%D' | grep a7a2953 -m 1 //%h,%an,%ai,%s
async function checkRepo (repo) {
    return new Promise(resolve => {
        const commits = [];
        const gpull = spawn('git', ['-C', repo.pathToRepo, 'pull']);
        gpull.stdout.on('data', (data) => {
            // console.log(String(data));
            const gl = spawn('git',
                [
                    '-C',
                    repo.pathToRepo,
                    'log',
                    repo.mainBranch, '--format=%h,%an,%ai,%s'
                ]
            );

            gl.stdout.on('data', (data) => {
                // console.log(String(data));
                commits.push(String(data));
            });
            gl.on('close', () => {
                resolve({ 
                    ...repo,
                    commits: commits
                        .map(commitLine => commitLine.split(','))
                });
            });
        });
    })
}

module.exports = {
    get: get,
    post: post,
    remove: remove,
    cloneRepo: cloneRepo,
    checkRepo: checkRepo
}