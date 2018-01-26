<template>
  <div :class="lang==='ar'?' has-text-right':''">
    <div class="field">
      <div class="file is-large is-boxed is-primary" @click="click">
        <label class="file-label">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fa fa-upload"></i>
            </span>
            <span class="file-label">
              {{block[lang].labels}}
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config/dev.json";
let path = "/api/v1/upload";
let host = config.host;
let url = host + path;
if (process.env.NODE_ENV === "production") {
  host = window.location.protocol + "//" + window.location.host;
  url = host + path;
}
import { getValue } from "@/api/parser.service.js";
export default {
  props: {
    block: {
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
    }
  },
  methods: {
    click() {
      window.open(url + "/" + this.block[this.lang].value);
    }
  },
  created() {
    this.display = getValue(this.block, this.lang, this.datas);
    addEventListener("pageReady", () => {
      this.display = getValue(this.block, this.lang, this.datas);
    });
  },
  data() {
    return {
      display: ""
    };
  }
};
</script>

<style>

</style>
