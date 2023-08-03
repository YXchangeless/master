<template>
  <div :id="id" v-bind:style="{ width: width,height: height }"></div>
</template>
<script>
// 引入echarts
import echarts from "echarts";
export default {
  name:'line_echarts',
  props: {
    id: String,
    width: '100%',
    height: {
        type: String,
        default: ()=> '300px'
    },
    option: {
      type: Object,
      default: () => {
          
      },
    },
  },
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.id));
      // 指定图表的配置项和数据
      var option = this.option
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style></style>
