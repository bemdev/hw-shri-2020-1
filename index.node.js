const { getSettings, getBuildList, startBuild, finishBuild } = require('./server/controllers');

getSettings()
    .then(({ data }) => {
        if (data) {
            setInterval(() => {
                console.log('Build Worker check turn...');
                getBuildList({ query: { limit: 25, offset: 0 } })
                    .then(({ data }) => {
                        const turnWaiters = data.filter(d => d.status !== 'Success');
                        turnWaiters.forEach(build => {
                            if (build.status === 'InProgress') {
                                setTimeout(() => {
                                    finishBuild(build);
                                    console.log(`Build Worker finish ${build.commitHash}`);
                                }, 3000)
                            } else {
                                setTimeout(() => {
                                    startBuild(build);
                                    console.log(`Build Worker start ${build.commitHash}`);
                                }, 3000)
                            }
                        });
                    })
            }, data.period * 10000);
        }
    });