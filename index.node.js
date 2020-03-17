const { getSettings, getBuildList, startBuild, finishBuild } = require('./server/controllers');

getSettings()
    .then(({ data }) => {
        if (data) {
            setInterval(() => {
                console.log('Build Worker check turn...', new Date().toUTCString());
                getBuildList({ query: { limit: 25, offset: 0 } })
                    .then(({ data }) => {
                        const turnWaiters = data
                            .filter(d => d.status !== 'Success');

                        if (turnWaiters.length === 0) {
                            data.period = 10;
                            console.log('Build Worker idle...zz');
                        }
                        
                        turnWaiters.forEach((build, index) => {
                            if (build.status === 'InProgress') {
                                setTimeout(() => {
                                    finishBuild(build);
                                    console.log(`Build Worker finish ${build.commitHash}`);
                                }, 3000 * index)
                            } else {
                                setTimeout(() => {
                                    startBuild(build);
                                    console.log(`Build Worker start ${build.commitHash}`);
                                }, 3000 * index)
                            }
                        });

                    })
            }, data.period * 60000);
        }
    });