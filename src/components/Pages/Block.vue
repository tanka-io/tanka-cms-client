<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div :class="setClass(block.children)" v-for="b in block.children" :key="b._id">
          <div class="row">
            <div class="col-12">
              <h1 v-if="b.type==='title'">{{getValue(b)}}</h1>
              <div v-if="b.type==='text'" v-html="getValue(b)"></div>
              <img v-if="b.type==='image'" :src="getValue(b)" class="img-fluid">
              <vue-chart v-if="b.type==='chart'" :chartType="'PieChart'" :columns="getColumns(b)" :rows="getRows(b)" :options="options"></vue-chart>
              <!-- <iframe v-if="b.type==='video'" class="img-fluid" src="https://www.youtube.com/watch?v=TnVRO0g0cF4">
              </iframe> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Block from "@/models/Block.js";
export default {
  name: "BlockComponent",
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
      required: false
    }
  },
  methods: {
    setClass(children) {
      if (window.innerWidth > 768) {
        let size = 12;
        while (size * children.length > 12) {
          size--;
        }
        return "space col-" + size;
      }
      return "space col-12";
    },
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
            e = e[col];
          });
          rows.forEach((row, i) => {
            x = x[row];
          });
          arr.push(x[this.lang]);
          arr.push(parseInt(e));
          return arr;
        });
      }
      this.rerender();
      return [];
    },
    rerender() {
      setTimeout(() => {
        this.$forceUpdate();
      }, 100);
    }
  },
  data() {
    return {
      options: {
        curveType: "function",
        height: 600
      }
    };
  }
};
</script>

<style scoped>
.max {
  width: 100%;
  height: 100%;
  min-width: 0px;
}
</style>
