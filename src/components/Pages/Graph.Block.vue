<template>
  <div>
    <block-graph :datas="values" :labels="labels" @click="clicked"></block-graph>
    <div :class="lang==='ar'?' has-text-right':''">
      <div>{{path.join(" || ")}}</div><br>
      <button class="button is-primary" @click="reset">{{$store.getters.getMessages[lang]?$store.getters.getMessages[lang].reset:"Reset"}}</button>
    </div>
  </div>
</template>

<script>
const BlockGraph = () =>
  import("@/components/Shared/Charts/BlockGraph.component.vue");
import { getValue } from "@/api/parser.service.js";
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
  created() {
    this.display = getValue(this.block, this.lang, this.datas);
    this.selected = this.display;
    if (this.block && this.block[this.lang] && this.block[this.lang].labels) {
      this.selectedLabels = JSON.parse(this.block[this.lang].labels);
    }
    addEventListener("pageReady", () => {
      this.display = getValue(this.block, this.lang, this.datas);
      this.selected = this.display;
      if (this.block && this.block[this.lang] && this.block[this.lang].labels) {
        this.selectedLabels = JSON.parse(this.block[this.lang].labels);
      }
    });
  },
  computed: {
    values() {
      if (typeof this.selected === "object" && this.selected.length) {
        return this.selected.map(e => e._data.value);
      } else if (typeof this.selected === "object") {
        return Object.keys(this.selected).map(e => {
          return this.getSum(this.selected[e]);
        }, this);
      }
      return [];
    },
    labels() {
      if (this.selectedLabels && this.selectedLabels.length > 0) {
        return this.selectedLabels
          .filter((e, i) => {
            return i < Object.keys(this.selected).length;
          })
          .map(e => {
            let obj = {};
            obj[this.lang] = e;
            return obj;
          });
      } else {
        if (typeof this.selected === "object" && this.selected.length) {
          return this.selected.map(e => {
            return { ar: e._data.label[this.lang] };
          });
        } else if (typeof this.selected === "object") {
          return Object.keys(this.selected).map(e => {
            return { ar: e };
          });
        }
      }
      return [];
    }
  },
  methods: {
    getSum(obj) {
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
            return this.getSum(obj[key]);
          }, this)
          .reduce((p, c) => {
            return p + c;
          }, 0);
      }
    },
    clicked(value) {
      this.values.forEach((e, i) => {
        if (
          e === value &&
          !this.selected[Object.keys(this.selected)[i]]._data
        ) {
          this.path.push(this.selectedLabels[i]);
          this.selected = this.selected[Object.keys(this.selected)[i]];
          this.selectedLabels = this.selectedLabels[
            i + Object.keys(this.selected).length + 1
          ];
          this.$forceUpdate();
        }
      }, this);
    },
    reset() {
      this.selected = this.display;
      this.path = [];
      if (this.block && this.block[this.lang] && this.block[this.lang].labels) {
        this.selectedLabels = JSON.parse(this.block[this.lang].labels);
      }
    }
  },
  data() {
    return {
      display: "",
      selected: "",
      selectedLabels: [],
      path: []
    };
  },
  components: {
    BlockGraph
  }
};
</script>

<style>

</style>
