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
            console.log('We have some trouble with connect to server');
        });
};

const agentStartBuild = (req, res) => {
    const { id, pathToRepo, commitHash, buildCommand } = req.body;
    console.log(id, pathToRepo, commitHash, buildCommand)
    // return axios
    //     .post(`${cfg.serverHost}:${cfg.serverPort}/notify-agent`, {
    //         port: port,
    //         host: host,
    //     })
    //     .then(result => {
    //         console.log('Agent connected');
    //     })
    //     .catch(err => {
    //         console.log('We have some trouble with connect to server');
    //     });
};

module.exports = {
    agentReady: agentReady,
    agentStartBuild: agentStartBuild
};
