export default {
  name: 'rpResult',
  data() {
    return {
      // 回测绩效表现
      portPerfTable: {
        matrixTabledata: [],
        column: []
      },
      // 历史权重配置
      option6Data: {},
      option6: {
        color: [
          'rgb(51,102,204)',
          'rgb(51,51,201)',
          'rgb(255,102,102)',
          'rgb(204,102,251)',
          'rgb(51,153,255)',
          'rgb(155,102,51)',
          'rgb(153,153,51)',
          'rgb(204,153,102)',
          'rgb(204,0,51)'
        ],
        grid: {
          left: 50,
          bottom: 120,
          top: 30,
          right: 30
        },
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 50,
            left: 80,
            right: 80,
            bottom: 60
          }
        ],
        smooth: 1,
        legend: {
          data: ['', ''],
          bottom: 2,
          textStyle: {
            fontSize: '12'
          },
          // type: 'scroll',
          // orient: 'horizontal',
          // right: 10,
          // left: 10,
          // height: '100%',
          // width: '90%',
          tooltip: {
            show: true
          }
        },
        tooltip: {
          trigger: 'axis',
          confine: true,
          textStyle: {
            fontsize: 14
          }
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: []
        }],
        yAxis: {
          type: 'value',
          max: 100
        },
        series: [
          {
            name: '',
            type: 'line',
            areaStyle: {},
            data: []
          }
        ]
      }
    }
  },
  methods: {
    setPortPerf(portPerfTable) {
      this.portPerfTable.matrixTabledata = portPerfTable.bodyList
      this.portPerfTable.column = portPerfTable.headerList
    },
    drowEchartsWeight(histWeightChart) {
      this.option6.xAxis[0].data = []
      this.option6.series = []
      this.option6.xAxis[0].data = histWeightChart.dateList
      histWeightChart.weightDataList.forEach((item, index) => {
        this.option6.series[index] = {
          name: item.assetNm,
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: item.weightList
        }
      })
      this.option6.legend.data = histWeightChart.assetNmList
      this.option6Data = this.option6
    }
  }
}
