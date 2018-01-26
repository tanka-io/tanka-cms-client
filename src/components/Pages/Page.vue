<template>
  <PageComponent :page="page" :lang="lang" :datas="datas" :pageClass="pageClass">
  </PageComponent>
</template>

<script>
const PageComponent = () => import("./Page.Component.vue");
import { getDatasQuery } from "@/api/datas.service.js";
export default {
  created() {
    this.$store.dispatch("setPageForce", {});
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
    let p1 = new Promise((bigResolve, bigReject) => {
      let promises = new Array();
      this.$store.dispatch("getPagesQueryOne", query).then(res => {
        let page = res[0];
        if (page && page.dataSource) {
          page.dataSource.forEach(e => {
            this.datas[e.value] = { default: "cheers love" };
            let p = new Promise((resolve, reject) => {
              getDatasQuery({
                "_schema._id": e.type,
                _label: e.value
              }).then(d => {
                this.datas[e.value] = d[0];
                resolve();
              });
            });
            promises.push(p);
          });
        }
      });
      Promise.all(promises).then(() => {
        bigResolve();
      });
    });
    let p2 = new Promise((resolve, reject) => {
      if (this.$route.query._id && this.$route.query.label) {
        getDatasQuery({
          "_schema._id": this.$route.query._id,
          _label: this.$route.query.label
        }).then(d => {
          if(d[0] && d[0]._schema){
          this.datas[d[0]._schema._title] = d[0];
          }
          resolve();
        });
      } else {
        if (this.$route.path.indexOf("_dataList") !== "-1") {
          getDatasQuery({
            "_schema._id": this.$route.query._id
          }).then(d => {
            this.datas._dataList = d;
            resolve();
          });
        }
      }
    });
    Promise.all([p1, p2]).then(() => {
      let ready = new Event("pageReady");
      dispatchEvent(ready);
    });
  },
  computed: {
    page() {
      return this.$store.getters.getSelectedPage;
    },
    lang() {
      return this.$store.getters.getLang;
    },
    pageClass() {
      if (this.page && this.page.container && this.page.container === true) {
        return "container";
      } else {
        return "section";
      }
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
