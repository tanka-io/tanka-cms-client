<template>
  <div class="columns is-multiline">
    <div v-for="b in block.children" :class="setClass(b)" :key="b._id">
      <TitleBlock v-if="b.type==='title'" :block="b" :lang="lang" :datas="datas"></TitleBlock>
      <TextBlock v-if="b.type==='text'" :block="b" :lang="lang" :datas="datas"></TextBlock>
      <ImageBlock v-if="b.type==='image'" :block="b" :lang="lang" :datas="datas"></ImageBlock>
      <ChartBlock v-if="b.type==='chart'" :block="b" :lang="lang" :datas="datas"></ChartBlock>
      <GraphBlock v-if="b.type==='graph'" :block="b" :lang="lang" :datas="datas"></GraphBlock>
      <FileBlock v-if="b.type==='file'" :block="b" :lang="lang" :datas="datas"></FileBlock>
      <!-- <iframe v-if="b.type==='video'" class="img-fluid" src="https://www.youtube.com/watch?v=TnVRO0g0cF4">
              </iframe> -->
    </div>
  </div>
</template>

<script>
import Block from "@/models/Block.js";
const ChartBlock = () => import("./Chart.Block.vue");
const TextBlock = () => import("./Text.Block.vue");
const TitleBlock = () => import("./Title.Block.vue");
const ImageBlock = () => import("./Image.Block.vue");
const GraphBlock = () => import("./Graph.Block.vue");
const FileBlock = () => import("./File.Block.vue");
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
    setClass(block) {
      if (window.innerWidth > 768 && block.size) {
        if (block.border) {
          return "space column is-" + block.size + " border";
        }
        return "space column is-" + block.size;
      }
      return "space column is-12";
    }
  },
  components: {
    ChartBlock,
    TextBlock,
    TitleBlock,
    ImageBlock,
    GraphBlock,
    FileBlock
  }
};
</script>

<style scoped>
.max {
  width: 100%;
  height: 100%;
  min-width: 0px;
}

.hoverable:hover {
  transform: scale(1.02);
  transition: transform 100ms;
}

.marginBottom {
  margin-bottom: 32px;
}

.border {
  border: 2px solid lightgrey;
  padding-left: 8px;
  padding-right: 8px;
}

.padding {
  padding: 8px 8px 8px 8px;
}
</style>
