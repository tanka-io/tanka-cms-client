<template>
  <b-navbar toggleable="lg" type="light" variant="faded" :style="style">
    <b-navbar-brand :to="{name:'page',params:{pageName:''}}">
      <img :src="logo" class="img-fluid">
    </b-navbar-brand>

    <b-nav-toggle target="nav_collapse"></b-nav-toggle>

    <b-collapse is-nav id="nav_collapse">
      <b-nav is-nav-bar>
        <div v-for="s in sections" :key="s._id">
          <b-nav-item v-if="s.children && s.children.length===0" :to="getTo(s)">
            {{s[lang].title}}
          </b-nav-item>
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
import { getDatasQuery } from "@/api/datas.service.js";
const SubMenu = () => import("./Sub.Component.vue");
import config from "@/config/dev.json";
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
      return [
        {
          color: "blue"
        }
      ];
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
      //fr
      section.fr = new Object();
      section.fr.title = data.nom.fr;
      if (parentSection.fr) {
        section.fr.target = parentSection.fr.target;
        section.fr.data = parentSection.fr.data;
      }
      //en
      section.en = new Object();
      section.en.title = data.nom.en;
      if (parentSection.en) {
        section.en.target = parentSection.en.target;
        section.en.data = parentSection.en.data;
      }
      //fr
      section.ar = new Object();
      section.ar.title = data.nom.ar;
      if (parentSection.ar) {
        section.ar.target = parentSection.ar.target;
        section.ar.data = parentSection.ar.data;
      }
      section.label = d._label;
      return section;
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
  }
};
</script>

<style>

</style>
