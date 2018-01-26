<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{name:'index'}">
        <img :src="logo" class="image logo">
      </router-link>
      <button class="button navbar-burger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div :class="menuClass">
      <div class="navbar-start">
        <div v-for="s in sections" :key="s._id" :class="setNavClass(s)">
          <div class="navbar-link" v-if="(!(s.children && s.children.length === 0 ) && s._showAll===true)">
            {{s[lang].title}}
          </div>
          <div class="navbar-dropdown" v-if="(!(s.children && s.children.length === 0) && s._showAll===true)">
            <sub-menu :sub="s" :lang="lang" @click="toggleMenu"></sub-menu>
          </div>
          <div v-if="(s.children && s.children.length === 0)">
            <router-link :to="{
          name: 'page',
          params: { pageName: s[lang].target }
        }">
              {{s[lang].title}}
            </router-link>
          </div>
          <div class="navbar-item" v-if="!(s.children && s.children.length === 0) && s._showAll===false">
            <router-link :to="{
          name: 'page',
          params: { pageName: s[lang]._default },
          query:{
            _id:s[lang].data
          }
        }">
              {{s[lang].title}}
            </router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-link">
            {{language}}
          </div>
          <div class="navbar-dropdown">
            <a class="navbar-item" @click="setLang('ar')">Arabe</a>
            <a class="navbar-item" @click="setLang('fr')">Francais</a>
            <a class="navbar-item" @click="setLang('en')">Englais</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { getDatasQuery } from "@/api/datas.service.js";
const SubMenu = () => import("./Sub.Component.vue");
import config from "@/config/dev.json";
export default {
  computed: {
    menuClass() {
      if (this.showMenu) {
        return "navbar-menu is-active";
      }
      return "navbar-menu";
    },
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
    },
    style() {
      let theme = this.$store.getters.getSelectedTheme;
      if (theme) {
        return [
          {
            backgroundColor: theme.navColor
          }
        ];
      }
      return {};
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
    },
    logo() {
      let path = "";
      if (
        this.$store.getters.getSelectedTheme &&
        this.$store.getters.getSelectedTheme.logoPath
      ) {
        path = this.$store.getters.getSelectedTheme.logoPath;
      }
      if (process.env.NODE_ENV === "development") {
        if (
          this.$store.getters.getSelectedTheme &&
          this.$store.getters.getSelectedTheme.logoPath
        ) {
          path = config.host + this.$store.getters.getSelectedTheme.logoPath;
        }
      }
      return path;
    }
  },
  methods: {
    setLang(l) {
      this.toggleMenu();
      this.$store.dispatch("setLang", l);
    },
    getTo(section) {
      let query = new Object();
      query[section[this.lang].data] = "ok";
      let aux = {
        name: "page",
        params: { pageName: section[this.lang].target },
        query: query
      };
      return aux;
    },
    dataToSection(d, parentSection) {
      let data = d[d._schema._title];
      let section = new Object();
      let langs = ["fr", "ar", "en"];
      langs.forEach(l => {
        section[l] = new Object();
        section[l].title = data[parentSection._subLabel][l];
        if (parentSection[l]) {
          section[l].target = parentSection[l].target;
          section[l].data = parentSection[l].data;
          section[l]._default = parentSection._default;
        }
      });
      section.label = d._label;
      section._type = parentSection._type;
      return section;
    },
    setNavClass(section) {
      if (section.children && section.children.length === 0) {
        return "navbar-item";
      } else {
        return "navbar-item has-dropdown is-hoverable";
      }
    },

    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  },
  created() {
    this.$store.dispatch("getAllSections").then(d => {
      d
        .filter(s => {
          if (s._type === "template") {
            return true;
          }
          return false;
        }, this)
        .forEach(s => {
          getDatasQuery({ "_schema._id": s[this.lang].data }).then(datas => {
            s.children = new Array();
            datas.forEach(newSection => {
              s.children.push(this.dataToSection(newSection, s));
              this.$forceUpdate();
            });
          });
        }, this);
    });
  },
  components: {
    SubMenu
  },
  data() {
    return {
      showMenu: false
    };
  }
};
</script>

<style scoped>
.logo {
  height: 32px;
  margin-top: 12px;
  margin-left: 12px;
}
</style>
