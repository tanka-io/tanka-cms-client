<template>
  <div class="center">
    <div class="blocks">
      <div v-for="i in 10" :key="i">
        <div class="columns is-mobile">
          <div v-for="j in 10" :key="j" class="block column" @click="click(((i-1)*10)+j)" :style="getStyle(((i-1)*10)+j)">
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="columns is-multiline">
        <div class="column is-12" v-for="(d,i) in displayLabel" :key="d.label">
          {{d.label}} : {{d.value}}
          <span class="little" :style="'background-color:'+d.color"> &nbsp; &nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      required: false
    },
    labels: {
      type: Array,
      required: false
    }
  },
  computed: {
    total() {
      if (this.datas) {
        return this.datas.reduce((p, c) => {
          if (c === "") {
            c = 0;
          }
          p = parseInt(p);
          c = parseInt(c);
          return p + c;
        }, 0);
      }
      return 0;
    },
    finalColors() {
      if (this.colors) {
        return this.colors;
      }
      return this.$store.getters.getColors;
    },
    displayLabel() {
      let labels = new Array();
      this.datas.reduce((p, c, i) => {
        if (c === "") {
          c = 0;
        }
        p = parseInt(p);
        c = parseInt(c);
        labels.push({
          label: this.labels[i][this.$store.getters.getLang],
          value: c,
          color: this.finalColors[i % this.finalColors.length]
        });
        return p + c;
      }, 0);
      return labels;
    }
  },
  methods: {
    getStyle(index) {
      let color = {
        backgroundColor: this.finalColors[0]
      };
      this.datas.reduce((p, c, i) => {
        if (c === "") {
          c = 0;
        }
        p = parseInt(p);
        c = parseInt(c);
        if (this.toPercentage(p + c, this.total) - index < 0) {
          color = {
            backgroundColor: this.finalColors[(i + 1) % this.finalColors.length]
          };
        }
        return p + c;
      }, 0);
      return color;
    },
    indexToData(index) {
      let idx = 0;
      this.datas.reduce((p, c, i) => {
        if (c === "") {
          c = 0;
        }
        p = parseInt(p);
        c = parseInt(c);
        if (this.toPercentage(p + c, this.total) - index < 0) {
          idx = i + 1;
        }
        return p + c;
      }, 0);
      return this.datas[idx];
    },
    toPercentage(value, total) {
      return value / total * 100;
    },
    click(i) {
      this.$emit("click", this.indexToData(i));
    }
  }
};
</script>

<style>
.center {
  text-align: center;
  margin-top: 32px;
}
.little {
  width: 16px !important;
  height: 16px !important;
}
.blocks {
  margin: auto;
  width: 520px;
  
}
.block {
  border-radius: 5px;
  margin: 2px 2px 2px 2px;
  height: 48px;
  width: 48px;
}
.block:hover {
  transform: scale(1.1);
  transition: transform 50ms ease-in;
}
@media screen and (max-width: 786px) {
  .blocks {
    width: 340px;
  }
  .block {
    height: 30px;
    width: 30px;
  }
}
@media screen and (max-width: 578px) {
  .blocks {
    width: 280px;
  }
  .block {
    height: 24px;
    width: 24px;
  }
}
</style>
