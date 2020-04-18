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

const checkTask = async (agents, interval) => {
    agents
        .filter(agent => agent.agentActive)
        .map((agent, i) => out = setTimeout(() => {
                //send task to agent
                if (agent) {
                    //get settings repo
                    axios.get(`${cfg.apiBaseUrl}/conf`, options)
                        .then(({data}) => {
                            const settings = data.data;

                            axios.get(`${cfg.apiBaseUrl}build/list?limit=25`, options)
                                .then(({data}) => {
                                    const turnWaiters = data.data.filter(
                                        b => b.status !== 'Success',
                                    );
                                    let currentBuild = turnWaiters.pop();
                                    startTask(agent, currentBuild || [], settings)
                                }).catch(err => console.log('Some trouble with data-server'));

                        }).catch(err => { console.log('Some trouble with data-server')});;

                    //filter build with status Waiting
                    
                } else {
                    console.log('No agent');
                }
        }, 5000 * i + 1));
};

// id сборки, адрес репозитория, хэш коммита, команда, которую надо запустить
const startTask = (agent, build, settings) => {
    if (build.id && agent) {
        startBuildStatus(build.id)
            .then(() => {
                axios.post(`${agent.host}:${agent.port}/build`, {
                    id: build.id,
                    pathToRepo: `./repos/${settings.repoName}`,
                    commitHash: build.commitHash,
                    buildCommand: settings.buildCommand,
                    mainBranch: settings.mainBranch
                }).catch(err => { console.log(`We no have agents - last agent is ${agent.host}:${agent.port}`)});
            }).catch(err => { console.log('Some trouble with data-server')});
    } else {
        console.log('We no have builds')
    }
};


const startBuildStatus = (id) => {
    if (id) {
        return axios.post(`${cfg.apiBaseUrl}build/start`, {
            "buildId": id,
            "dateTime": new Date().toISOString()
        }, options).then(result => {
            return result
        }).catch(err => { console.log('Some trouble with start build')});
    }
}

module.exports = {
    checkTask: checkTask,
};
