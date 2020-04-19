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
        .forEach((agent, i) => {
            if (agent) {
                axios.get(`${cfg.apiBaseUrl}/conf`, options)
                    .then(({data}) => {
                        const settings = data.data;

                        setTimeout(() => {
                            axios.get(`${cfg.apiBaseUrl}build/list?limit=25`, options)
                                .then(({data}) => {
                                    const turnWaiters = data.data.filter(
                                        b => b.status !== 'Success',
                                    );
                                    let currentBuild = turnWaiters[i];
                                    if (currentBuild) {
                                        startTask(agent, currentBuild, settings)
                                    } else {
                                        return console.log(`Agent #${agent.agentNumber} is idle`) 
                                    }
                                }).catch(err => console.log('Some trouble with get builds data-server'));
                        }, 5000 * settings.period);

                    }).catch(err => console.log('Some trouble with get settings data-server', err));
            } else {
                console.log('No agent');
            }
        });
};

// id сборки, адрес репозитория, хэш коммита, команда, которую надо запустить
const startTask = (agent, build, settings) => {
    
    if (build.id && agent) {
        startBuildStatus(build.id)
            .then((date) => {
                const duration = Date.now();
                axios.post(`${agent.host}:${agent.port}/build`, {
                    id: build.id,
                    pathToRepo: `./repos/${settings.repoName}`,
                    commitHash: build.commitHash,
                    buildCommand: settings.buildCommand,
                    mainBranch: settings.mainBranch,
                    duration: duration
                }).catch(err => console.log(`We no have agents - last agent is ${agent.host}:${agent.port}`));
            }).catch(err => console.log('Some trouble with data-server'));
    } else {
        console.log('We no have builds')
    }
};


const startBuildStatus = (id) => {
    if (id) {
        const date = new Date().toISOString();

        return axios.post(`${cfg.apiBaseUrl}build/start`, {
            "buildId": id,
            "dateTime": new Date().toISOString()
        }, options).then(result => {
            return date
        }).catch(err => console.log('Some trouble with start build'));
    }
}

module.exports = {
    checkTask: checkTask,
};
