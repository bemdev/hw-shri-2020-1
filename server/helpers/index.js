require('dotenv').config();
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

async function cloneRepo (repoName) {
    const pathToGit = `./repos/${repoName}`;
    const gc = spawn('git', ['clone', `https://github.com/bemdev/${repoName}`, pathToGit]);
    return new Promise(resolve => {
        gc.on('close', () => {
            resolve({
                repoName: repoName,
                pathToGit: pathToGit
            }) 
        })
    });
}

module.exports = {
    get: get,
    post: post,
    remove: remove,
    cloneRepo: cloneRepo
}