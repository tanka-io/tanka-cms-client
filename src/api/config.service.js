import axios from 'axios';

import config from '../config/dev.json';
let path = "/api/v1/config";
let url = config.host + path;
if (process.env.NODE_ENV === 'production') {
    let host = window.location.protocol + "//" + window.location.host;
    url = host + path;
}

export function getConfig() {
    return new Promise((resolve, reject) => {
        axios.get(url).then(response => {
            let config = response.data.data;
            resolve(config);
        }).catch((err) => {
            reject(err);
        });
    });
}