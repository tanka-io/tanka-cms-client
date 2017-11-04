import { getConfig } from '@/api/config.service.js';

export default {
    state: {
        config: {
            menuType: "side"
        }
    },
    getters: {
        getConfig(state) {
            return state.config;
        }
    },
    mutations: {
        setConfig(state, config) {
            state.config = config;
        }
    },
    actions: {
        getConfig(context) {
            return new Promise((resolve, reject) => {
                getConfig().then(d => {
                    context.commit('setConfig', d[0]);
                    resolve(d[0]);
                });
            });
        }
    }
}