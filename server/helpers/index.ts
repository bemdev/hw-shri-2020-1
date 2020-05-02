require('dotenv').config()

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

import https from 'https';
import axios from 'axios';

import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

const options = {
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
    headers: {
        Authorization: 'Bearer ' + process.env.TOKEN,
    },
};

//Some wrappers axios - get - post - remove
export function get(url:string) {
    return axios.get(url, options);
}

export function post(url: string, data: any) {
    return axios.post(url, data, options);
}

export function remove(url: string) {
    return axios.delete(url, options);
}

//Clone git repos to local repo to 'repos' folder
export function cloneRepo(settings: Settings): Promise<Settings> {
    const pathToRepo = `./repos/${settings.repoName}`;

    return new Promise(resolve => {
        fs.exists(path.resolve(__dirname, '../../', pathToRepo), match => {
            if (!match) {
                const gc = spawn('git', [
                    'clone',
                    `https://github.com/${settings.repoName}`,
                    pathToRepo,
                ]);
                gc.on('close', () => {
                    resolve({
                        ...settings,
                        pathToRepo: pathToRepo,
                    });
                });
            } else {
                resolve({
                    ...settings,
                    pathToRepo: pathToRepo,
                });
            }
        });
    });
}

//Check new commit of local repos
//git reflog --format='%h|%an|%s|%D' | grep a7a2953 -m 1 //%h,%an,%ai,%s
export function checkRepo(repo: Settings): Promise<Settings> {
    return new Promise(resolve => {
        const commits:any = [];

        const gpull = spawn('git', ['-C', repo.pathToRepo, 'pull']);
        gpull.on('close', () => {
            const gl = spawn('git', [
                '-C',
                repo.pathToRepo,
                'log',
                repo.mainBranch,
                '--format=%h,%an,%ai,%s',
            ]);

            gl.stdout.on('data', (data:any) => {
                commits.push(String(data));
            });

            gl.on('close', () => {
                resolve({
                    ...repo,
                    commits: commits.map((commitLine: string) => commitLine.split(',')),
                });
            });
        });
    });
}

export default function statsToAssets({ entrypoints }: { entrypoints: any }) {
    return Object.keys(entrypoints).reduce((map:any, key:any) => {
        if (!map[key]) {
            map[key] = {};
        }

        entrypoints[key].assets.forEach((file: string) => {
            let ext:any = file.split('.').pop();

            if (!map[key][ext]) {
                map[key][ext] = file;
            }
        });

        return map;
    }, {});
}