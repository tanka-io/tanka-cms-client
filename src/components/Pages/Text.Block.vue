<template>
  <div :class="lang==='ar'?' has-text-right':''">
    <div v-html="display"></div>
  </div>
</template>

<script>
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
      required: false
    }
  },
  created() {
    this.display = getValue(this.block, this.lang, this.datas);
    addEventListener("pageReady", () => {
      this.display = getValue(this.block, this.lang, this.datas);
    });
  },
  data() {
    return {
      display: ""
    };
  }
};
</script>

<style>

</style>
