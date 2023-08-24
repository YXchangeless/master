export default {
  name: 'matrixAndYield',
  data() {
    return {
      option4Data: {},
      option4: {
        color: '#124B91',
        legend: {
          data: ['历史收益率'],
          icon: 'circle',
          top: '2%'
        },
        tooltip: {
          formatter: function(params) {
            return params[0].name + '<br/>' + params[0].seriesName + ' : ' + params[0].data + '%'
          },
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            boundaryGap: true,
            axisLabel: {
              show: true,
              interval: 0,
              formatter: function(value) {
                var ret = ''// 拼接加\n返回的类目项
                var maxLength = 10// 每项显示文字个数
                var valLength = value.length// X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
                if (rowN > 1) {
                  for (var i = 0; i < rowN; i++) {
                    var temp = ''// 每次截取的字符串
                    var start = i * maxLength// 开始截取的位置
                    var end = start + maxLength// 结束截取的位置
                    // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + '\n'
                    ret += temp // 凭借最终的字符串
                  }
                  return ret
                } else {
                  return value
                }
              },
              textStyle: {
                color: '#606266', // X轴文字颜色
                padding: [0, 0, 0, 0],
                fontSize: 12
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: '历史收益率',
            type: 'bar',
            barWidth: 40,
            barCategoryGap: '90%',
            label: {
              show: true,
              formatter: '{c}%',
              position: 'inside'
            },
            data: []
          }
        ]
      },
      // 相关性矩阵表头
      column: [],
      // 相关性内容
      matrixTabledata: [],
      //  后验
      option5Data: {},
      option5: {
        color: '#124B91',
        legend: {
          data: ['后验收益率'],
          icon: 'circle',
          top: '2%'
          // bottom: -2
        },
        tooltip: {
          formatter: function(params) {
            return params[0].name + '<br/>' + params[0].seriesName + ' : ' + params[0].data + '%'
          },
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            boundaryGap: true,
            axisLabel: {
              show: true,
              interval: 0,
              formatter: function(value) {
                var ret = ''// 拼接加\n返回的类目项
                var maxLength = 10// 每项显示文字个数
                var valLength = value.length// X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
                if (rowN > 1) {
                  for (var i = 0; i < rowN; i++) {
                    var temp = ''// 每次截取的字符串
                    var start = i * maxLength// 开始截取的位置
                    var end = start + maxLength// 结束截取的位置
                    // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + '\n'
                    ret += temp // 凭借最终的字符串
                  }
                  return ret
                } else {
                  return value
                }
              },
              textStyle: {
                color: '#606266', // X轴文字颜色
                padding: [0, 0, 0, 0],
                fontSize: 12
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: '后验收益率',
            type: 'bar',
            barWidth: 40,
            barCategoryGap: '90%',
            label: {
              show: true,
              formatter: '{c}%',
              position: 'inside'
            },
            data: []
          }
        ]
      }
    }
  },
  methods: {
    drowHistoryYield(result) {
      this.option4.yAxis[0].data = result.assetNmList.reverse()
      this.option4.series[0].data = result.indexYieldList.reverse()
      this.option4Data = this.option4
    },
    drowLateYieldChart(result) {
      // 后验
      this.option5.yAxis[0].data = result.assetNmList.reverse()
      this.option5.series[0].data = result.indexYieldList.reverse()
      this.option5Data = this.option5
    },
    setMatrix(relatChart) {
      this.matrixTabledata = relatChart.bodyList
      this.column = relatChart.headerList
    }
  }
}
