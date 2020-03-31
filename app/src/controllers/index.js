export const getBuildList = async () => {
    const fd = await fetch('http://localhost:3010/api/builds/list?limit=25');
    const fdJson = await fd.json();
    return fdJson;
};

export const getSettings = () => {
	return fetch('http://localhost:3010/api/settings').then(res => res.json());
};

export const saveSettings = (settings) => {
    const { repoName, mainBranch, buildCommand, period } = settings;
    return fetch('http://localhost:3010/api/settings', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
            { repoName: repoName, mainBranch: mainBranch, buildCommand: buildCommand, period: Number(period) }
        )
    }).then(res => 'ok');
};

export const getBuildSingle = (buildId) => {
    return fetch('http://localhost:3010/api/builds/{buildId}?buildId=' + buildId)
        .then(res => {
            return res.json();
        });
};

export const getBuildSingleWithLog = async (buildId) => {
    const buildFetch = await fetch('http://localhost:3010/api/builds/{buildId}?buildId=' + buildId);
    const build = await buildFetch.json();

    const buildLogFetch = await fetch('http://localhost:3010/api/builds/{buildId}/logs?buildId=' + buildId);
    const log = await buildLogFetch.text();
    build.data.log = log;

    return build;
};

export const getBuildLog = (buildId) => {
    return fetch('http://localhost:3010/api/builds/{buildId}?buildId=' + buildId + '/log')
        .then(res => {
            return res.json();
        });
};

export const buildRequest = (buildParams, hash) => {
    return new Promise(resolve => {
        const { commits, mainBranch } = buildParams;
        return commits.some(commit => {
            if (commit[0] === hash) {
                fetch('http://localhost:3010/api/build/request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(
                        {
                            commitMessage: commit[3],
                            commitHash: commit[0],
                            branchName: mainBranch,
                            authorName: commit[1]
                        }
                    )
                }).then(res => resolve(res));
            }
            return false;
        })
    })
};
