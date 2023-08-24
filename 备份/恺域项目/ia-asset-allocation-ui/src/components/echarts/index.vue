<template>
  <!-- echarts图表  -->
  <div ref="echartsId" style="width:100%" :style="{height:height}">
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'EchartsBox',
  // echarts接受数据
  props: {
    dataEcharts: Object,
    height: { type: String, default: '270px' },
    isClick: { type: Boolean, default: false }
  },
  data() {
    return {
      myChart: ''
    }
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      opened: (state) => state.app.sidebar.opened
    })
  },
  watch: {
    // 监听echarts
    opened() {
      setTimeout(() => {
        this.myChart ? this.myChart.resize() : ''
      }, 500)
    },
    // 自适应
    dataEcharts: {
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          this.echarts(newVal)
        })
      },
      deep: true
    }
  },
  methods: {
    // 表格颜色
    echarts(newVal) {
      this.myChart = echarts.init(this.$refs.echartsId)
      this.myChart.setOption(newVal, true)
      if (this.isClick) {
        this.myChart.on('mouseover', (params) => {
          // 在用户点击后控制台打印数据的名称
          if (params.seriesName === '推荐组合') {
            this.$emit('getIndex', 'recon', 0)
          } else {
            this.$emit('getIndex', 'front', params.dataIndex)
          }
        })
      }
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    }
  }
}
</script>
