require('dotenv').config()

import https from 'https';
import axios from 'axios';

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