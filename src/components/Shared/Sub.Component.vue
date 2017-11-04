<template>
  <div class="margin-left">
    <b-dropdown-item active-class="no" :to="{name:'page',params:{pageName:sub[lang].target}}">{{sub[lang].title}}</b-dropdown-item>
    <div v-for="x in sub.children" :key="x._id">
      <SubMenu :sub="x" :lang="lang"></SubMenu>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  props: {
    sub: {
      type: Object,
      required: true
    },
    lang: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.margin-left {
  margin-left: 8px;
}
</style>
