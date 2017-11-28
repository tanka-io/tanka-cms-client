<template>
    <vue-chart :chartType="'PieChart'" :columns="getColumns(block)" :rows="getRows(block)" :options="options"></vue-chart>

</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      required: true
    },
    lang: {
      type: String,
      required: true
    },
    datas: {
      type: Object,
      required: true
    }
  },
  methods: {
    getValue(b) {
      if (b.type === "text" || b.type === "title") {
        return this.getStringValue(b);
      } else {
        return this.getDataFromString(b[this.lang].value);
      }
      this.rerender();
      return b;
    },
    getStringValue(b) {
      let string = b[this.lang].value;
      while (string.indexOf("{{") !== -1) {
        let i = string.indexOf("{{");
        let e = string.indexOf("}}");
        let auxString = string.substring(i + 2, e);
        let data = this.getDataFromString(auxString)[this.lang];
        string = string.slice(0, i) + data + string.slice(e + 2);
      }
      return string;
    },
    getDataFromString(string) {
      string = this.cleanVar(string);
      let keys = string.split(".");
      let data = new Object();
      Object.assign(data, this.datas);
      let error = false;
      keys.forEach(function(key) {
        if (data[key]) {
          data = data[key];
        } else {
          error = true;
          string =
            "the key '" +
            new String(key) +
            "' doesn't exist, please verify that your data contains it \n ";
        }
      }, this);
      if (!error) {
        return data;
      } else {
        this.rerender();
        return {};
      }
    },
    cleanVar(string) {
      let i = string.indexOf("{{");
      let e = string.indexOf("}}");
      if (i !== -1 && e !== -1) {
        return string.substring(i + 2, e);
      }
      return string;
    },
    rerender() {
      this.counter--;
      if (this.counter > 0) {
        setTimeout(() => {
          this.$forceUpdate();
        }, 1000);
      }
    },
    getColumns(block) {
      let arr = this.getValue(block);
      if (arr && arr.length && arr.length === 0 && typeof arr === "object") {
        alert("unable to find the array of data");
        let cols = block[this.lang]._columns.split(".");
        let rows = block[this.lang]._rows.split(".");
      }
      return [
        {
          type: "string",
          label: "Year"
        },
        {
          type: "number",
          label: "shit"
        }
      ];
      return [];
    },
    getRows(block) {
      let arr = this.getValue(block);
      if (arr && arr.length && arr.length === 0 && typeof arr === "object") {
        alert("unable to find the array of data");
      }
      if (arr && arr.length) {
        let cols = block[this.lang]._columns.split(".");
        let rows = block[this.lang]._rows.split(".");
        return arr.map(e => {
          let arr = new Array();
          let x = new Object();
          Object.assign(x, e);
          cols.forEach(col => {
            if (e[col]) {
              e = e[col];
            } else {
              console.log(e);
            }
          });
          rows.forEach((row, i) => {
            if (x[row]) {
              x = x[row];
            } else {
              console.log(x);
            }
          });
          arr.push(x[this.lang]);
          arr.push(parseInt(e));
          return arr;
        });
      }
      this.rerender();
      return [];
    }
  },
  data() {
    return {
      options: {
        curveType: "function",
        height: 600
      },
      counter: 5
    };
  }
};
</script>

<style>

</style>
