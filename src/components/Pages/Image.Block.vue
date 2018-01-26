<template>
  <img :src="display" class="image">
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
  methods: {
    setClass(block) {
      if (window.innerWidth > 768 && block.size) {
        return "space col-" + block.size;
      }
      return "space col-12";
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
