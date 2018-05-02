
export function getSum(obj) {
    if (typeof obj === "object" && obj.length) {
        return obj.reduce((p, c) => {
            if (c._data.value === "") {
                c._data.value = 0;
            }
            c._data.value = parseInt(c._data.value);
            return p + parseInt(c._data.value);
        }, 0);
    } else {
        return Object.keys(obj)
            .map(key => {
                return getSum(obj[key]);
            }, this)
            .reduce((p, c) => {
                return p + c;
            }, 0);
    }
}