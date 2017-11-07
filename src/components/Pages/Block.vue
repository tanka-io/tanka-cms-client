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
      let s = "";
      if (b[this.lang].value) {
        s = b[this.lang].value;
      }
      if (s.indexOf("{{") !== -1) {
        s = s.split(" ");
        let data = new Object();
        Object.assign(data, this.datas);
        s.forEach((e, i) => {
          if (
            e[0] === "{" &&
            e[1] === "{" &&
            e[e.length - 1] === "}" &&
            e[e.length - 2] === "}"
          ) {
            e = e.substring(2, e.length - 2);
            let splited = e.split(".");
            splited.forEach(v => {
              if (data[v]) {
                data = data[v];
              }
            }, this);
            e = data;
          }

          if (e[this.lang]) {
            e = e[this.lang];
          }
          s[i] = e;
        }, this);

        return s.join(" ");
      } else {
        return s;
      }
    }
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
