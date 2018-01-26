let messages = new Object();
let language = "ar";
import("@/assets/translation/ar.json").then(d => {
    messages.ar = d;
});
import("@/assets/translation/fr.json").then(d => {
    messages.fr = d;
});
import("@/assets/translation/en.json").then(d => {
    messages.en = d;
});
export default {
    state: {
        lang: "fr",
        messages: messages
    },
    getters: {
        getLang(state) {
            return state.lang;
        },
        getMessages(state) {
            return state.messages;
        }
    },
    mutations: {
        setLang(state, lang) {
            state.lang = lang;
        }
    },
    actions: {
        setLang(context, lang) {
            if (lang === "fr" || lang === "en" || lang === "ar") {
                context.commit("setLang", lang);
                language = lang;
            } else {
                context.commit("setLang", "ar");
                language = "ar";
            }
        }
    }
}