<template>
<div id="chart"></div>
</template>

<script>
export default {
  mounted() {
    var d3 = Plotly.d3;
    var WIDTH_IN_PERCENT_OF_PARENT = 60,
      HEIGHT_IN_PERCENT_OF_PARENT = 80;
    var gd3 = d3
      .select("#chart")
      .append("div")
      .style({
        width: WIDTH_IN_PERCENT_OF_PARENT + "%",
        "margin-left": (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + "%",

        height: HEIGHT_IN_PERCENT_OF_PARENT + "vh",
        "margin-top": (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + "vh"
      });
    var gd = gd3.node();
    Plotly.plot(
      gd,
      [
        {
          type: "pie",
          values: [20,15,98,21],
          labels: ["shit","just","got","real"]
        }
      ],
      {
        title: "Auto-Resize",
        font: {
          size: 16
        }
      }
    );
    window.onresize = function() {
      Plotly.Plots.resize(gd);
    };
  },
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
      required: true
    }
  }
};
</script>

<style>

</style>
