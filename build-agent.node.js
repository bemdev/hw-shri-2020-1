const {
    getSettings,
    getBuildList,
    startBuild,
    finishBuild,
} = require('./server/controllers');

getSettings().then(({ data }) => {
    if (data) {
        const settings = data;
        setInterval(() => {
            console.log('Build Worker check turn...', new Date().toUTCString());
            getBuildList({ query: { limit: 25, offset: 0 } }).then(
                ({ data }) => {
                    const turnWaiters = data.filter(
                        d => d.status !== 'Success',
                    );

                    if (turnWaiters.length === 0) {
                        data.period = data.period * 10;
                        console.log('Build Worker idle...zz');
                    }

                    turnWaiters.forEach((build, index) => {
                        setTimeout(() => {
                            console.log(
                                `Build Worker start ${build.commitHash}`,
                            );
                            startBuild(build, settings).then(data => {
                                finishBuild(
                                    build,
                                    data.log,
                                    data.startTime,
                                ).then(result => {
                                    console.log(
                                        `Build Worker finish ${
                                            build.commitHash
                                        }`,
                                    );
                                });
                            });
                        }, 4000 * index);
                    });
                },
            );
        }, data.period * 20000);
    }
});