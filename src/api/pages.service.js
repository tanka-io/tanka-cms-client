import axios from 'axios';
import { refresh } from './auth.service.js';
import config from '../config/dev.json';
let path = "/api/v1/pages";
let url = config.host + path;
if (process.env.NODE_ENV === 'production') {
    let host = window.location.protocol + "//" + window.location.host;
    url = host + path;
}

export function getAllPages() {
    return new Promise((resolve, reject) => {
        axios.get(url).then(response => {
            let pages = response.data.data;
            resolve(pages);
        }).catch((err) => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    getAllPages();
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}
export function getPageById(id) {
    return new Promise((resolve, reject) => {
        axios.get(url + "/" + id).then(response => {
            let page = response.data.data;
            resolve(page);
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    getPageById(id);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}

export function insertPage(page) {
    return new Promise((resolve, reject) => {
        axios.post(url, page).then(response => {
            let page = response.data.data;
            resolve(page);
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    insertPage(page);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}

export function editPage(page) {
    return new Promise((resolve, reject) => {
        let id = page._id;
        axios.put(url + "/" + id, page).then(response => {
            let page = response.data.data;
            resolve(page);
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    editPage(page);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}

export function deletePage(id) {
    return new Promise((resolve, reject) => {
        axios.delete(url + "/" + id).then(response => {
            resolve();
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    deletePage(id);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}

export function getPagesQuery(query) {
    return new Promise((resolve, reject) => {
        let q = JSON.stringify(query);
        axios.get(url+"/query/"+q).then(response => {
            let pages = response.data.data;
            resolve(pages);
        }).catch((err) => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    getAllPages();
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}