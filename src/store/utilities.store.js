
export default {
    state: {
        colors: [
            "red",
            "blue",
            "orange",
            "yellow",
            "green"
        ]
    },
    getters: {
        getColors(state) {
            return state.colors;
        }
    }
}