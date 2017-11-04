import { getAllSections, getSectionById, insertSection, editSection, deleteSection } from '@/api/sections.service.js';

export default {
    state: {
        sections: [],
        selectedSection: {}
    },
    getters: {
        getAllSections(state) {
            return state.sections;
        },
        getSelectedSection(state) {
            return state.selectedSection;
        }
    },
    mutations: {
        getAllSections(state, sections) {
            state.sections = sections;
        },
        getSectionById(state, section) {
            for (let i = 0; i < state.sections.length; i++) {
                if (state.sections[i]._id === section._id) {
                    state.sections.splice(i, 1);
                    break;
                }
            }
            state.sections.push(section);
        },
        setSelectedSection(state, section) {
            state.selectedSection = section;
        }
    },
    actions: {
        getAllSections(context) {
            return new Promise((resolve, reject) => {
                getAllSections().then(sections => {
                    context.commit("getAllSections", sections);
                    resolve(sections);
                }).catch(err => {
                    reject(err);
                })
            });
        },
        getSectionById(context, id) {
            return new Promise((resolve, reject) => {
                getSectionById(id).then(section => {
                    context.commit("getSectionById", section);
                    context.commit("setSelectedSection", section);
                    resolve(section);
                }).catch(err => {
                    reject(err);
                })
            });
        }
    }
}