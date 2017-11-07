import axios from 'axios';
import { refresh } from './auth.service.js';
import config from '../config/dev.json';
let path = "/api/v1/themes";
let url = config.host + path;
if (process.env.NODE_ENV === 'production') {
    let host = window.location.protocol + "//" + window.location.host;
    url = host + path;
}


export function getAllThemes() {
    return new Promise((resolve, reject) => {
        axios.get(url).then(response => {
            let themes = response.data.data;
            resolve(themes);
        }).catch((err) => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    getAllThemes();
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}
export function getThemeById(id) {
    return new Promise((resolve, reject) => {
        axios.get(url + "/" + id).then(response => {
            let theme = response.data.data;
            resolve(theme);
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    getThemeById(id);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}

export function insertTheme(theme) {
    return new Promise((resolve, reject) => {
        axios.post(url, theme).then(response => {
            let theme = response.data.data;
            resolve(theme);
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    insertTheme(theme);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}

export function editTheme(theme) {
    return new Promise((resolve, reject) => {
        let id = theme._id;
        axios.put(url + "/" + id, theme).then(response => {
            let theme = response.data.data;
            resolve(theme);
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    editTheme(theme);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}

export function deleteTheme(id) {
    return new Promise((resolve, reject) => {
        axios.delete(url + "/" + id).then(response => {
            resolve();
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    deleteTheme(id);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}

export function getThemeQuery(query) {
    return new Promise((resolve, reject) => {
        let q = JSON.stringify(query);
        axios.get(url + "/query/" + q).then(response => {
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