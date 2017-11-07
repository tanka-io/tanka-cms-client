import axios from 'axios';
import config from '../config/dev.json';
let path = "/api/v1/auth";
let url = config.host + path;
if (process.env.NODE_ENV === 'production') {
    let host = window.location.protocol + "//" + window.location.host;
    url = host + path;
}

export function login(user) {
    return new Promise((resolve, reject) => {
        axios.post(url + "/login", user).then((response) => {
            localStorage.token = response.data.data.token;
            let token = localStorage.token;
            axios.defaults.headers.common['Authorization'] = "Bearer " + token;
            resolve(response.data.data.user);
        }).catch(err => reject(err));
    });
}

export function getInfo(token) {
    return new Promise((resolve, reject) => {
        axios.get(url + "/info").then((response) => {
            resolve(response.data.data);
        }).catch(err => reject(err));
    });
}

export function refresh() {
    return new Promise((resolve, reject) => {
        if (localStorage.token) {
            let token = localStorage.token;
            axios.defaults.headers.common['Authorization'] = "Bearer " + token;
            axios.get(url + "/refresh").then(response => {
                localStorage.token = response.data.data;
                let token = localStorage.token;
                axios.defaults.headers.common['Authorization'] = "Bearer " + token;
                resolve(token);
            }).catch(err => {
                reject(err);
            });
        } else {
            reject();
        }
    });
}