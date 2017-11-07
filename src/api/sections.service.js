import axios from 'axios';
import { refresh } from './auth.service.js';
import config from '../config/dev.json';
let path = "/api/v1/sections";
let url = config.host + path;
if (process.env.NODE_ENV === 'production') {
    let host = window.location.protocol + "//" + window.location.host;
    url = host + path;
}


export function getAllSections() {
    return new Promise((resolve, reject) => {
        axios.get(url).then(response => {
            let sections = response.data.data;
            resolve(sections);
        }).catch((err) => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    getAllSections();
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}
export function getSectionById(id) {
    return new Promise((resolve, reject) => {
        axios.get(url + "/" + id).then(response => {
            let section = response.data.data;
            resolve(section);
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    getSectionById(id);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}

export function insertSection(section) {
    return new Promise((resolve, reject) => {
        axios.post(url, section).then(response => {
            let section = response.data.data;
            resolve(section);
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    insertSection(section);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}

export function editSection(section) {
    return new Promise((resolve, reject) => {
        let id = section._id;
        axios.put(url + "/" + id, section).then(response => {
            let section = response.data.data;
            resolve(section);
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    editSection(section);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}

export function deleteSection(id) {
    return new Promise((resolve, reject) => {
        axios.delete(url + "/" + id).then(response => {
            resolve();
        }).catch(err => {
            if (err.response.status === 401) {
                refresh().then(() => {
                    deleteSection(id);
                }).catch(() => {
                    reject(err);
                });
            }
            reject(err);
        });
    });
}