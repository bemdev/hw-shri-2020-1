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

const checkTask = async agents => {
    const agent = agents.find((agent) => {
        if (agent.agentActive) return agent;
    });

    //get settings repo
    const settings = await axios.get(`${cfg.apiBaseUrl}/conf`, options)
    .then(({data}) => data.data);
    
    //get all builds
    const builds = await axios.get(`${cfg.apiBaseUrl}build/list?limit=25`, options)
        .then(({data}) => data.data);

    //filter build with status Waiting
    const turnWaiters = builds.filter(
        d => d.status !== 'Success',
    );

    let currentBuild = turnWaiters.pop();

    //send task to agent
    if (currentBuild) {
        startTask(agent, currentBuild, settings);
    } else {
        console.log('No build to finish')
    }
};

// id сборки, адрес репозитория, хэш коммита, команда, которую надо запустить
const startTask = (agent, build, settings) => {
    // console.log(agent, build);
    startBuildStatus(build.id)
        .then(() => {
            axios.post(`${agent.host}:${agent.port}/build`, {
                id: build.id,
                pathToRepo: `./repos/${settings.repoName}`,
                commitHash: build.commitHash,
                buildCommand: settings.buildCommand,
                mainBranch: settings.mainBranch
            });
        });
};


const startBuildStatus = (id) => {
    return axios.post(`${cfg.apiBaseUrl}build/start`, {
        "buildId": id,
        "dateTime": new Date().toISOString()
    }, options).then(result => {
        return result
    });
}

module.exports = {
    checkTask: checkTask,
};
