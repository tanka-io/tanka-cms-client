<template>
  <!-- <vue-chart :chartType="'PieChart'" :columns="getColumns(block)" :rows="getRows(block)" :options="options"></vue-chart> -->
  <block-graph :datas="values" :labels="labels"></block-graph>
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
    addEventListener("pageReady", () => {
      this.display = getValue(this.block, this.lang, this.datas);
    });
  },
  computed: {
    values() {
      if (typeof this.display === "object" && this.display.length) {
        return this.display.map(e => {
          return e._data.value;
        });
      }
      return [];
    },
    labels() {
      if (typeof this.display === "object" && this.display.length) {
        return this.display.map(e => {
          return e._data.label;
        });
      }
      return [];
    }
  },
  data() {
    return {
      display: ""
    };
  },
  components: {
    BlockGraph
  }
};
</script>

<style>

</style>
