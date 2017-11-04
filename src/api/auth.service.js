import axios from 'axios'
import config from "./config.json"

const url = config.host + "/api/v1/auth"

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