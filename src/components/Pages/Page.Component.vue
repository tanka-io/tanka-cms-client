<template>
  <div :class="pageClass">
    <div class="columns is-multiline">
      <div class="column is-12" v-if="page.tabs && page.tabs.length>1">
        <div class="tabs">
          <ul>
            <li :class="isActive(i)" v-for="(tab,i) in tabs" :key="i"><a  @click.prevent="setSelectedTab(i)">{{tab[lang].title}}</a></li>
          </ul>
        </div>
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
  computed:{
    tabs(){
      return (this.page && this.page.tabs)?this.page.tabs.sort((a,b)=>a.order-b.order):[];
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
    isActive(i) {
      if (i === this.selectedTab) {
        return "is-active"
      }
      return "";
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

</style>
