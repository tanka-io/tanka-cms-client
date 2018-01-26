<template>
  <div :class="pageClass">
    <div class="columns is-multiline">
      <div class="column is-12" v-if="page.tabs && page.tabs.length>1">
        <button class="tabs" v-for="(tab,i) in page.tabs" :key="tab[lang].title" @click="setSelectedTab(i)" :style="isSelected(i)">{{tab[lang].title}}</button>
        <hr>
      </div>
      <div class="column is-12" v-if="page.tabs">
        <div class="columns is-multiline">
          <div class="column is-12" v-for="(b,i) in page.tabs[selectedTab].children" :key="(''+selectedTab+'dd'+i)">
            <BlockComponent :block="b" :lang="lang" :datas="datas"></BlockComponent>
          </div>
        </div>
      </div>
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
    },
    pageClass: {
      type: String,
      required: true
    }
  },
  components: {
    BlockComponent
  },
  data() {
    return {
      selectedTab: 0
    };
  },
  methods: {
    setSelectedTab(i) {
      this.selectedTab = i;
    },
    isSelected(i) {
      if (i === this.selectedTab) {
        return {
          borderBottom: "3px solid blue"
        };
      }
      return {};
    }
  }
};
</script>

<style scoped>
.limit-height {
  height: 600px;
}
.marginBottom {
  margin-bottom: 48px;
}

.tabs {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 48px;
  border: none;
  background: none;
  font-weight: 900;
}

.tabs:hover {
  transform: scale(1.2);
  transition: transform 200ms;
}
</style>
