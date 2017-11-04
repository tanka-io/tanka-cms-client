import { login, refresh, getInfo } from '@/api/auth.service.js';

export default {
    state: {
        user: {}
    },
    getters: {
        getCurrentUser(state) {
            return state.user;
        }
    },
    mutations: {
        setCurrentUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        login(context, user) {
            return new Promise((resolve, reject) => {
                login(user).then(user => {
                    context.commit('setCurrentUser',user);
                    resolve(user);
                }).catch(err => {
                    reject(err)
                });
            });
        },
        refresh(context) {
            return new Promise((resolve, reject) => {
                refresh().then(token => {
                    resolve(token);
                }).catch(err => {
                    reject(err)
                });
            });
        },
        getInfo(context, token) {
            return new Promise((resolve, reject) => {
                getInfo(token).then(user => {
                    context.commit("setCurrentUser", user);
                    resolve(user);
                }).catch(err => {
                    reject(err)
                });
            });
        },
        logout(context) {

            return new Promise((resolve, reject) => {
                context.commit("setCurrentUser", {});
                localStorage.clear();
                resolve();
            });
        }
    }
}