<template>
  <canvas ref="canvas"></canvas>
</template>
<script>
import { Bar } from "vue-chartjs";

export default {
  props: {
    labels: {
      type: Array,
      required: true
    },
    values: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: "Datas",
          data: this.values,
          backgroundColor: "#209cee"
        }
      ]
    });
  },
  extends: Bar
};
</script>

<style>

</style>
