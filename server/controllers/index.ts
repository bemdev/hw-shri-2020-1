import {
    get,
    post,
    remove,
} from '../helpers';

type buildListType = { query: { limit: number; offset: number; } };
type responseBuild = { send: (data: [] | string) => void; };
type buildType = { query: { buildId: string } };

//Get a list of all builds
export function getBuildList(req: buildListType, res:responseBuild)  {
    return new Promise(resolve => {
        const { limit, offset } = req.query;

        get(`https://hw.shri.yandex/api/build/list?limit=${limit}&offset=${offset}`)
            .then(response => {
                if (res) {
                    res.send(response.data);
                } else {
                    resolve(response.data);
                }
            })
            .catch(err => {
                console.log(err.response.status)
                if (err) res.send([]);
            });
    });
}

//Get a build by id
export function getBuildById(req: buildType, res:responseBuild) {
    const { buildId } = req.query;
    get(`https://hw.shri.yandex/api/build/details?buildId=${buildId}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            if (err) res.send([]);
        });
}

//Get build full log of remote repo make
export function getBuildLogs(req: buildType, res:responseBuild) {
    const { buildId } = req.query;
    get(`https://hw.shri.yandex/api/build/log?buildId=${buildId}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            if (err) res.send([]);
        });
}

//Add build to turn by req.body
export function addBuildToTurn(req: { body: [] }, res:responseBuild) {
    post('https://hw.shri.yandex/api/build/request', req.body) //need fix this but it work
        .then(() => {
            res.send('Build waiting');
        })
        .catch(err => {
            if (err) {
                throw err;
            }
        });
}

//Cancel build by ID with any status
export function cancelBuild(build: { id: string } ) {
    //return 500 error ? dont cancel build plz
    post('https://hw.shri.yandex/api/build/cancel', {
        buildId: build.id,
    }).catch(err => {
        if (err) throw err;
    });
}

//Multi get setting profile - clone and check repo
export function getSettings(req: any, res:responseBuild) {
    return get('https://hw.shri.yandex/api/conf')
        .then(({ data }) => {
            if (res) return res.send(data);
            return data;
        })
        .catch(err => {
            if (err) res.send([]);
        });
}

//Multi save settings - clone check and add to turn - mb ref this
export function saveSettings(req: { body: [] }, res:responseBuild) {
    post('https://hw.shri.yandex/api/conf', req.body)
        .then(({ data }) => {
            // const firstCommit = data.commits[0]; //fix this [0][2]
            // addBuildToTurn({
            //     body: {
            //         commitMessage: firstCommit[3],
            //         commitHash: firstCommit[0],
            //         branchName: infoCommits.mainBranch,
            //         authorName: firstCommit[1],
            //     },
            // });
            res.send('need commits'); //infoCommits
        })
        .catch(err => {
            if (err) throw err;
        });
}

//Remove settings profile - delete all build history
export function removeSettings(req:any, res:responseBuild) {
    remove('https://hw.shri.yandex/api/conf')
        .then(() => res.send('Setting remove.'))
        .catch(err => {
            if (err) throw err;
        });
}