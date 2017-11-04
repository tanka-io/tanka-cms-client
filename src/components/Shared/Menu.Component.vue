<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-brand :to="{name:'page',params:{pageName:''}}">
      Client
    </b-navbar-brand>

    <b-nav-toggle target="nav_collapse"></b-nav-toggle>

    <b-collapse is-nav id="nav_collapse">
      <b-nav is-nav-bar>
        <div v-for="s in sections" :key="s._id">
          <b-nav-item v-if="s.children && s.children.length===0" :to="{name:'page',params:{pageName:s[lang].target}}">{{s[lang].title}}</b-nav-item>
          <b-nav-item-dropdown v-else>
            <template slot="button-content">
              <em>{{s[lang].title}}</em>
            </template>
            <div v-for="x in s.children" :key="x._id">
              <SubMenu :sub="x" :lang="lang"></SubMenu>
            </div>
          </b-nav-item-dropdown>
        </div>
      </b-nav>

      <b-nav is-nav-bar class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{language}}</em>
          </template>
          <b-dropdown-item @click="setLang('ar')">Arabe</b-dropdown-item>
          <b-dropdown-item @click="setLang('fr')">Francais</b-dropdown-item>
          <b-dropdown-item @click="setLang('en')">Englais</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
const SubMenu = () => import("./Sub.Component.vue");
export default {
  computed: {
    language() {
      let lang = this.lang;
      if (lang === "en") {
        return "Englais";
      } else if (lang === "fr") {
        return "Francais";
      } else if (lang === "ar") {
        return "Arabe";
      }
    },
    lang() {
      return this.$store.getters.getLang;
    },
    sections() {
      return this.$store.getters.getAllSections;
    }
  },
  methods: {
    setLang(l) {
      this.$store.dispatch("setLang", l);
    }
  },
  created() {
    this.$store.dispatch("getAllSections");
  },
  components: {
    SubMenu
  }
};
</script>

<style>

</style>
