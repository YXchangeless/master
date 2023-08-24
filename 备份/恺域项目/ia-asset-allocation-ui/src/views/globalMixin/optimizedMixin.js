import { mapGetters } from 'vuex'
import TableMatrix from '@/components/table/TableMatrix.vue'
import echartsComponent from '@/components/echarts'

let recomPctChartIndex = {}
// eslint-disable-next-line no-unused-vars
let positionChartIndex = {}
export default {
  name: 'ModelingOptimized',
  components: { echartsComponent, TableMatrix },
  data() {
    return {
      indexCol: [{ code: 'assetNm', name: '资产名称', width: '150px' }, {
        code: 'positionPct',
        name: '持仓占比',
        width: '140px'
      }, {
        code: 'recomPct',
        name: '模型推荐占比', width: '140px'
      }, { code: 'hintMsg', name: '调仓建议' }],
      indexList: [],
      modelPlanIndexList: [],
      myChart1: '',
      myChart2: '',
      myChart3: '',
      option1: {
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
        tooltip: {
          trigger: 'item',
          confine: true,
          // formatter: "{a} <br/>{b}: {c} ({d}%)",
          // formatter: '{b}: {c} ({d}%)'
          formatter(params) {
            params.name = params.name + ' : ' + params.data.value
            Object.keys(recomPctChartIndex).forEach((item) => {
              if (item === params.data.code) {
                recomPctChartIndex[item].forEach((item) => {
                  params.name = params.name + '<br />' + item.name + ' : ' + item.value
                })
              }
            })
            return params.name
          }
        },
        legend: {
          show: false,
          top: 40,
          data: []
        },
        series: [
          {
            name: '',
            type: 'pie',
            // selectedMode: 'single',
            radius: [0, '70%'],
            center: ['50%', '55%'],
            label: {
              // borderColor: '#aaa',
              position: 'outer',
              // alignTo: 'labelLine',
              bleedMargin: 5,
              height: '20',
              rich: {
                b: {
                  fontSize: 12,
                  lineHeight: 28
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            labelLine: {
              show: true
            },
            data: []
          }
        ]
      },
      option2: {
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
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter(params) {
            params.name = params.name + ' : ' + params.data
            // params.name = params.name + ' : ' + params.data.value
            Object.keys(positionChartIndex).forEach((item) => {
              if (item === params.data.code) {
                positionChartIndex[item].forEach((item) => {
                  params.name = params.name + '<br />' + item.name + ' : ' + item.value
                })
              }
            })
            return params.name
          }
        },
        legend: {
          show: true,
          top: 40,
          data: ['港指100', '港指200', '港指300']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: [0, '70%'],
            center: ['50%', '55%'],
            label: {
              position: 'outer',
              bleedMargin: 12
            },
            labelLine: {
              show: true
            },
            data: []
          }
        ]
      },
      option3: {
        color: ['#ed7a2c', '#5b9bd5', '#a5a5a5'],
        grid: {
          left: 50,
          bottom: 90,
          top: 58,
          right: 30
        },
        smooth: 1,
        legend: {
          data: ['有效前沿', '推荐组合'],
          bottom: 20,
          textStyle: {
            fontSize: '12'
          }
        },
        tooltip: {
          trigger: 'axis',
          confine: true,
          textStyle: {
            fontsize: 14
          },
          formatter(params) {
            let name = ''
            params.forEach((item) => {
              if (!name.includes(item.seriesName)) {
                name = name + item.seriesName + ': ( ' + item.value[0] + ' ，' + item.value[1] + ' )' + ' <br/>'
              }
            })
            return name
          }
        },
        xAxis: [{
          type: 'value',
          data: [],
          min: '',
          max: '',
          splitLine: {
            show: false
          },
          name: '年化标准差（%）',
          nameTextStyle: {
            padding: [60, 0, 0, -80] // 四个数字分别为上右下左与原位置距离
          }
        }],
        yAxis: {
          type: 'value',
          name: '收益率（%）'
        },
        series: [
          {
            name: '有效前沿',
            type: 'line',
            markLine: {
              lineStyle: {
                width: 2
              },
              label: {
                position: 'insideEndTop',
                formatter: '{b}',
                color: '#333'
              },
              symbolSize: 0
            },
            itemStyle: {
              borderColor: 'blue',
              color: 'blue'
            },
            data: []
          },
          {
            name: '推荐组合',
            type: 'line',
            itemStyle: {
              borderWidth: 5,
              borderColor: '#EAA926',
              color: '#EAA926'
            },
            symbol: 'triangle',
            symbolSize: 5,
            symbolRotate: -61,
            data: []
          }
        ]
      },
      //  回测
      option1Data: {},
      option2Data: {},
      option3Data: {},
      frontChart: {},
      custPctChart: {},
      HGCP: 0,
      DLSF: 0
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    getIndex(name, index) {
      if (name === 'recon') {
        const data = this.frontChart.recom.valueList[0].indexPctChart
        this.drowEcharts1(data)
      } else {
        const data = this.frontChart.front.valueList[index].indexPctChart
        this.drowEcharts1(data)
      }
    },
    setIndex(indexList) {
      this.indexList = indexList
    },
    drowEcharts1(recomPctChart) {
      recomPctChart.assetList.forEach((item, index) => {
        item.itemStyle = { color: this.option1.color[index] }
      })
      this.option1.series[0].data = recomPctChart.assetList
      // eslint-disable-next-line no-const-assign
      recomPctChartIndex = recomPctChart.assetMap
      this.option1Data = this.option1
    },
    drowEcharts2(positionPctChart) {
      positionPctChart.assetList.forEach((item, index) => {
        item.itemStyle = { color: this.option2.color[index] }
      })
      this.option2.series[0].data = positionPctChart.assetList
      positionChartIndex = positionPctChart.assetMap
      this.option2Data = this.option2
    },
    drowEchartsFront(frontChart) {
      this.frontChart = frontChart
      const Xdata = []
      const Ydata1 = []
      const Ydata2 = []
      frontChart.front.valueList.forEach((element) => {
        Xdata.push(Number(element.x))
        Ydata1.push([element.x, element.y])
      })
      Xdata.push(Number(frontChart.recom.valueList[0].x))
      Ydata2.push([frontChart.recom.valueList[0].x, frontChart.recom.valueList[0].y])
      var max = Math.max.apply(null, Xdata)
      var min = Math.min.apply(null, Xdata)
      this.option3.xAxis[0].max = max
      let xMin = Math.floor(min - (max - min) / 10)
      if (min >= 0 && max >= 0 && xMin <= 0) {
        xMin = 0
      }
      this.option3.xAxis[0].min = xMin
      this.option3.series[0].data = Ydata1
      this.option3.series[1].data = Ydata2
      this.option3.xAxis[0].name = frontChart.front.axisXName + '（' + frontChart.front.axisXUnit + '）'
      this.option3Data = this.option3
    }
  }
}
