<template>
  <PageComponent :page="page" :lang="lang" :datas="datas">
  </PageComponent>
</template>

<script>
const PageComponent = () => import("./Page.Component.vue");
import { getDatasQuery } from "@/api/datas.service.js";
export default {
  created() {
    let query = new Object();
    if (
      this.$route.params.pageName &&
      this.$route.params.pageName !== "" &&
      this.$route.params.pageName !== null
    ) {
      query[this.lang + ".title"] = this.$route.params.pageName;
    } else {
      query[this.lang + ".title"] = "index";
  }
    this.$store.dispatch("getPagesQueryOne", query);
    getDatasQuery({
      "_schema._id": this.$route.query._id,
      _label: this.$route.query.label
    }).then(d => {
      this.datas = d[0];
    });
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
  },
  data() {
    return {
      datas: {}
    };
  }
};
</script>

<style>

</style>
