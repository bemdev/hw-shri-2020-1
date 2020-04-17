const cfg = require('./server-conf.json');
const axios = require('axios');

const checkTask = async agents => {
    const agent = agents.find((agent) => {
        if (agent.agentActive) return agent;
    });

    //get settings repo
    const settings = await axios.get(`${cfg.apiBaseUrl}/api/settings`)
    .then(({data}) => data.data);
    
    //get all builds
    const builds = await axios.get(`${cfg.apiBaseUrl}/api/builds/list?limit=25&offset=0`)
        .then(({data}) => data.data);

    //filter build with status Waiting
    const turnWaiters = builds.filter(
        d => d.status === 'Waiting',
    );

    //send task to agent
    startTask(agent, turnWaiters.pop(), settings);
};

// id сборки, адрес репозитория, хэш коммита, команда, которую надо запустить
const startTask = (agent, build, settings) => {
    // console.log(agent, build);
    axios.post(`${agent.host}:${agent.port}/build`, {
        id: build.id,
        pathToRepo: settings.pathToRepo,
        commitHash: build.commitHash,
        buildCommand: settings.buildCommand
    });
};

module.exports = {
    checkTask: checkTask
};
