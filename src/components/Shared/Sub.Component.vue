<template>
  <div class="margin-left">
    <a class="navbar-item" @click="goTo">
      {{title}}
    </a>
    <div v-for="x in sub.children" :key="x._id">
      <SubMenu :sub="x" :lang="lang" @click="$emit('click')"></SubMenu>
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
    itemStyle() {
      let theme = this.$store.getters.getSelectedTheme;
      if (theme) {
        return [
          {
            color: theme.itemColor
          }
        ];
      }
      return {};
    }
  },
  methods: {
    goTo() {
      this.$emit("click");
      if (this.sub[this.lang]) {
        let query = new Object();
        if ((this.sub._type === "template" && this.sub[this.lang].data)) {
          query._id = this.sub[this.lang].data;
          query.label = this.sub.label;
          if(this.sub._subLabel){
            this.sub[this.lang].target = this.sub[this.lang]._default;
          }
        }
        this.$router.push({
          name: "page",
          params: { pageName: this.sub[this.lang].target },
          query: query
        });
      }
      return "";
    }
  }
};
</script>

<style scoped>
.margin-left {
  margin-left: 12px;
}
</style>
