import axios from 'axios';
import config from './config.json';
let url = config.host + "/api/v1/config";

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