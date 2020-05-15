import { Request, Response } from 'express';

import { get, post, remove, cloneRepo, checkRepo } from '../helpers';

type TRequestQuery = { buildId: string };
type TRequestQueryList = { limit: number; offset: number };

//Get a list of all builds
export function getBuildList(
    req: Request<{}, {}, TRequestQueryList>,
    res: Response,
) {
    return new Promise(resolve => {
        const { limit, offset } = req.query;

        get(
            `https://hw.shri.yandex/api/build/list?limit=${limit}&offset=${offset}`,
        )
            .then(response => {
                if (res) {
                    res.send(response.data);
                } else {
                    resolve(response.data);
                }
            })
            .catch(err => {
                console.log(err.response.status);
                if (err) res.send([]);
            });
    });
}

//Get a build by id
export function getBuildById(
    req: Request<{}, {}, TRequestQuery>,
    res: Response,
) {
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
export function getBuildLogs(
    req: Request<{}, {}, TRequestQuery>,
    res: Response,
) {
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
export function addBuildToTurn(req: { body: Settings | any }, res?: Response) {
    post('https://hw.shri.yandex/api/build/request', req.body)
        .then(() => {
            res && res.send('Build waiting');
        })
        .catch(err => {
            if (err) {
                throw err;
            }
        });
}

//Cancel build by ID with any status
export function cancelBuild(build: { id: string }) {
    //return 500 error ? dont cancel build plz
    post('https://hw.shri.yandex/api/build/cancel', {
        buildId: build.id,
    }).catch(err => {
        if (err) throw err;
    });
}

//Multi get setting profile - clone and check repo
export function getSettings(req: Request<{}, {}, Settings>, res: Response) {
    return get('https://hw.shri.yandex/api/conf')
        .then(({ data }) => {
            return cloneRepo(data.data)
                .then(checkRepo)
                .then((commits: any) => {
                    const dataToSend: any = { data: commits };
                    if (res) {
                        res.send(dataToSend);
                    } else {
                        return dataToSend;
                    }
                });
        })
        .catch(err => {
            if (err) res.send([]);
        });
}

//Multi save settings - clone check and add to turn - mb ref this
export function saveSettings(req: { body: Settings }, res: Response) {
    post('https://hw.shri.yandex/api/conf', req.body)
        .then(() => {
            res.send('Save ok');
            return cloneRepo(req.body)
                .then(checkRepo)
                .then(infoCommits => {
                    const firstCommit = infoCommits.commits[0]; //fix this [0][2]
                    addBuildToTurn({
                        body: {
                            commitMessage: firstCommit[3],
                            commitHash: firstCommit[0],
                            branchName: infoCommits.mainBranch,
                            authorName: firstCommit[1],
                        },
                    });
                    res.send('Save settings');
                });
        })
        .catch(err => {
            if (err) throw err;
        });
}

//Remove settings profile - delete all build history
export function removeSettings(req: Request, res: Response) {
    remove('https://hw.shri.yandex/api/conf')
        .then(() => res.send('Setting remove.'))
        .catch(err => {
            if (err) throw err;
        });
}