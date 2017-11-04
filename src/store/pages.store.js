import { getAllPages, getPageById, insertPage, editPage, deletePage,getPagesQuery } from '@/api/pages.service.js';

export default {
    state: {
        pages: [],
        selectedPage: {}
    },
    getters: {
        getAllPages(state) {
            return state.pages;
        },
        getSelectedPage(state) {
            return state.selectedPage;
        }
    },
    mutations: {
        getAllPages(state, pages) {
            state.pages = pages;
        },
        getPageById(state, page) {
            for (let i = 0; i < state.pages.length; i++) {
                if (state.pages[i]._id === page._id) {
                    state.pages.splice(i, 1);
                    break;
                }
            }
            state.pages.push(page);
        },
        setSelectedPage(state, page) {
            state.selectedPage = page;
        }
    },
    actions: {
        getAllPages(context) {
            return new Promise((resolve, reject) => {
                getAllPages().then(pages => {
                    context.commit("getAllPages", pages);
                    resolve(pages);
                }).catch(err => {
                    reject(err);
                })
            });
        },
        getPageById(context, id) {
            return new Promise((resolve, reject) => {
                getPageById(id).then(page => {
                    context.commit("getPageById", page);
                    context.commit("setSelectedPage", page);
                    resolve(page);
                }).catch(err => {
                    reject(err);
                })
            });
        },
        getPagesQueryOne(context,query) {
            return new Promise((resolve, reject) => {
                getPagesQuery(query).then(page => {
                    if(page[0]){
                    context.commit("setSelectedPage", page[0]);
                    resolve(page);
                    } else {
                        context.commit("setSelectedPage", {});
                        resolve({});

                    }
                }).catch(err => {
                    reject(err);
                })
            });
        }
    }
}