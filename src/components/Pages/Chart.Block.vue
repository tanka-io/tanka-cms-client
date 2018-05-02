<template>
  <div class="columns">
    <div class="column" v-if="values.map(e=>e>0).reduce((p,c)=>p||c,false)">
      <ChartComponent :labels="labels" :values="values"></ChartComponent>
    </div>
    <div class="column" v-else>
      <h4 class="title has-text-centered">{{$store.getters.getMessages[lang].unavailable}}</h4>
    </div>
  </div>
</template>

<script>
const ChartComponent = () =>
  import("@/components/Shared/Charts/BarChart.component.vue");
import { getValue, getDataFromString } from "@/api/parser.service.js";
import { getSum } from "@/api/utils.service.js";
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
    this.init();
    addEventListener("pageReady", () => {
      this.init();
    });
  },
  computed: {
    values() {
      if (
        typeof this.display === "object" &&
        typeof this.display._chartData === "object" &&
        typeof this.display._chartData
      ) {
        return this.display._chartData.map(e => e.value);
      }
      return [];
    },
    labels() {
      if (
        typeof this.display === "object" &&
        typeof this.display._chartData === "object" &&
        typeof this.display._chartData
      ) {
        return this.display._chartData.map(e => e.label[this.lang]);
      }
      return [];
    }
  },
  methods: {
    init() {
      this.display = getValue(this.block, this.lang, this.datas);
      if (
        this.block.value &&
        typeof this.block.value === "object" &&
        this.block.value.length > 0
      ) {
        this.display._chartData = this.block.value.map(e => {
          let returned = {
            label: e.label,
            value: e.value
          };
          // console.log(getDataFromString(e.label["ar"], this.datas))
          if (e.label[this.lang].indexOf("{{") !== -1) {
            returned.label = {
              ar: getDataFromString(e.label["ar"], this.datas),
              fr: getDataFromString(e.label["fr"], this.datas),
              en: getDataFromString(e.label["en"], this.datas)
            };
          }
          if (typeof e.value === "string" && e.value.indexOf("{{") !== -1) {
            returned.value = getDataFromString(e.value, this.datas);
            if (typeof returned.value === "object") {
              returned.value = getSum(returned.value);
            }
          } else if (typeof parseInt(e.value) === "number") {
            e.value = parseInt(e.value);
          }
          return returned;
        });
      }
    }
  },
  data() {
    return {
      display: ""
    };
  },
  components: {
    ChartComponent
  }
};
</script>

<style>

</style>
