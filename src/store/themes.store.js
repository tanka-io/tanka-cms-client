import { getAllThemes, getThemeById, insertTheme, editTheme, deleteTheme,getThemeQuery } from '@/api/themes.service.js';

export default {
    state: {
        themes: [],
        selectedTheme: {}
    },
    getters: {
        getAllThemes(state) {
            return state.themes;
        },
        getSelectedTheme(state) {
            return state.selectedTheme;
        }
    },
    mutations: {
        getAllThemes(state, themes) {
            state.themes = themes;
        },
        getThemeById(state, theme) {
            for (let i = 0; i < state.themes.length; i++) {
                if (state.themes[i]._id === theme._id) {
                    state.themes.splice(i, 1);
                    break;
                }
            }
            state.themes.push(theme);
        },
        setSelectedTheme(state, theme) {
            state.selectedTheme = theme;
        }
    },
    actions: {
        getAllThemes(context) {
            return new Promise((resolve, reject) => {
                getAllThemes().then(themes => {
                    context.commit("getAllThemes", themes);
                    resolve(themes);
                }).catch(err => {
                    reject(err);
                })
            });
        },
        getThemeById(context, id) {
            return new Promise((resolve, reject) => {
                getThemeById(id).then(theme => {
                    context.commit("getThemeById", theme);
                    context.commit("setSelectedTheme", theme);
                    resolve(theme);
                }).catch(err => {
                    reject(err);
                })
            });
        },
        getTheme(context) {
            return new Promise((resolve, reject) => {
                getThemeQuery({active:true}).then(themes => {
                    context.commit("getThemeById", themes[0]);
                    context.commit("setSelectedTheme", themes[0]);
                    resolve(themes[0]);
                }).catch(err => {
                    reject(err);
                })
            });
        }
    }
}