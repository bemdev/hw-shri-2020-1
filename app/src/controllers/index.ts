import axios from 'axios';

export const getBuildList = () => {
    return axios
        .get('http://localhost:3000/api/builds/list?limit=25&offset=0')
        .then(response => response.data);
};

export const getSettings = () => {
    return axios.get('http://localhost:3000/api/settings').then(({ data }) => {
        return data;
    });
};

export const saveSettings = (settings: Settings) => {
    const { repoName, mainBranch, buildCommand, period } = settings;
    return fetch('http://localhost:3000/api/settings', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            repoName: repoName,
            mainBranch: mainBranch,
            buildCommand: buildCommand,
            period: Number(period),
        }),
    }).then(res => 'ok');
};

export const getBuildSingleWithLog = async (buildId: Build) => {
    const build = await axios
        .get('http://localhost:3000/api/builds/{buildId}?buildId=' + buildId)
        .then(response => response.data)
        .catch((err: {}) => console.log(err));

    if (!build.data) return [];

    build.data.log = await getBuildLog(buildId);
    return build;
};

export const getBuildLog = (buildId: Build) => {
    return axios
        .get(
            'http://localhost:3000/api/builds/{buildId}/logs?buildId=' +
                buildId,
        )
        .then(response => response.data)
        .catch((err: {}) => console.log(err));
};

export const buildRequest = (buildParams: Settings, hash: string) => {
    return new Promise(resolve => {
        const { commits, mainBranch, repoName } = buildParams;

        return commits.some((commit: never) => {
            if (commit[0] === hash) {
                fetch('http://localhost:3000/api/build/request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({
                        commitMessage: commit[3],
                        commitHash: commit[0],
                        branchName: mainBranch,
                        authorName: commit[1],
                    }),
                }).then(res => resolve(res));
            }
            return false;
        });
    });
};
