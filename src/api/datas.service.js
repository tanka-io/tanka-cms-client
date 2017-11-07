import axios from 'axios';
import { refresh } from './auth.service.js';
import config from '../config/dev.json';
let path = "/api/v1/datas";
let url = config.host + path;
if (process.env.NODE_ENV === 'production') {
    let host = window.location.protocol + "//" + window.location.host;
    url = host + path;
}

export function getDatasQuery(query) {
    return new Promise((resolve, reject) => {
        let q = JSON.stringify(query);
        axios.get(url+"/query/"+q).then(response => {
            let datas = response.data.data;
            resolve(datas);
        }).catch((err) => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    getAllDatas();
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}