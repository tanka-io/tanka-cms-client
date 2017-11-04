<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div :class="setClass(block.children)" v-for="b in block.children" :key="b._id">
          <div class="row">
            <div class="col-12">
              <h1 v-if="b.type==='title'">{{b[lang].value}}</h1>
              <div v-if="b.type==='text'" v-html="b[lang].value"></div>
              <img v-if="b.type==='image'" :src="b[lang].value" class="img-fluid">
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
