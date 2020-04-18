require('dotenv').config();

const cfg = require('./server-conf.json');
const https = require('https');
const axios = require('axios');

const options = {
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
    headers: {
        Authorization: 'Bearer ' + process.env.TOKEN,
    },
};

const notifyAgent = (port, host, agents) => {
    const newAgent = {
        agentNumber: agents.length > 0 ? agents.length : agents.length + 1,
        agentActive: true,
        port: port,
        host: host,
    };

    agents = agents.filter(a => a.port !== newAgent.port)
    agents.push(newAgent);
    console.log(`New agent-${newAgent.agentNumber} connected`);

    return agents;
};

const notifyBuildResult = (req, res) => {
    const { id, log } = req.body;
    // console.log(id)

    return axios.post(`${cfg.apiBaseUrl}build/finish`, {
        "buildId": id,
        "duration": 0,
        "success": true,
        "buildLog": log
    }, options).then(({data}) => {
        console.log('Build id done');
    }).catch(err => console.log('Some trouble with finish build'));
};

module.exports = {
    notifyAgent: notifyAgent,
    notifyBuildResult: notifyBuildResult,
};
