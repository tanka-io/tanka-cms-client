<template>
  <PageComponent :page="page" :lang="lang">
  </PageComponent>
</template>

<script>
const PageComponent = () => import("./Page.Component.vue");
export default {
  created() {
    let query = new Object();
    if (this.$route.params.pageName && this.$route.params.pageName!==''&& this.$route.params.pageName!==null) {
      query[this.lang + ".title"] = this.$route.params.pageName;
    } else {
      query[this.lang + ".title"] = "index";
    }
    this.$store.dispatch("getPagesQueryOne", query);
  },
  computed: {
    page() {
      return this.$store.getters.getSelectedPage;
    },
    lang() {
      return this.$store.getters.getLang;
    }
  },
  components: {
    PageComponent
  }
};
</script>

<style>

</style>
