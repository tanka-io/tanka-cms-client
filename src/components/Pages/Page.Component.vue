<template>
  <div class="row">
    <div class="col-12" v-for="b in page.children" :key="b._id">
      <BlockComponent :block="b" :lang="lang" :datas="datas"></BlockComponent>
    </div>
  </div>
</template>

<script>
const BlockComponent = () => import("./Block.vue");
export default {
  props: {
    page: {
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
  components: {
    BlockComponent
  }
};
</script>

<style>

</style>
