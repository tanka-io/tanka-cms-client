import axios from 'axios';
import config from './config.json';
import { refresh } from './auth.service.js';
let url = config.host + "/api/v1/sections";

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