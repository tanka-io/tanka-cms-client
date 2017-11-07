<template>
  <div class="margin-left">
    <b-dropdown-item active-class="no" :to="goTo">{{title}}</b-dropdown-item>
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
  },
  computed: {
    title() {
      if (this.sub[this.lang]) {
        return this.sub[this.lang].title;
      }
      return "";
    },
    goTo() {
      if (this.sub[this.lang]) {
        let query = new Object();
        if (this.sub._type = "template" && this.sub[this.lang].data) {
          query._id = this.sub[this.lang].data;
          query.label = this.sub.label;
        }
        return {
          name: "page",
          params: { pageName: this.sub[this.lang].target },
          query: query
        };
      }
      return "";
    }
  }
};
</script>

<style scoped>
.margin-left {
  margin-left: 8px;
}
</style>
