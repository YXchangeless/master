<template>
  <div class="assets-scroll revenueAnalysis">
    <div class="title-bar"><span/>大类资产规模及收益分析</div>
    <el-form>
      <el-row>
        <!-- 账户 -->
        <el-col :span="8">
          <el-form-item label="账户 ：">
            <kySelect
              ref="marketResearchRef"
              label="accNm"
              value="accCd"
              :v-model="account"
              :options="accountOptions"
              @visibleChange="getAccount($event)"
            ></kySelect>
          </el-form-item>
        </el-col>
        <!-- end 账户 -->
        <!-- 日期 -->
        <el-col :span="8">
          <el-form-item label="日期 ：">
            <div class="block">
              <el-date-picker
                v-model="starDate"
                type="date"
                :picker-options="pickerOptions"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <!-- end 日期 -->
        <!-- 查询 重置 按钮-->
        <el-col :span="8" class="query">
          <el-button type="primary" @click="getTables();getCharts()">查询</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-col>
        <!-- end查询 重置 按钮-->
      </el-row>
    </el-form>
    <el-row>
      <el-button class="formButton" @click="switchForm()" v-bind:style="{ color: activeColor,background: activeBackground }">
        表格
      </el-button>
      <el-button class="chartButton" style="margin-left: 0px" @click="switchChart()" v-bind:style="{ color: chartColor,background: chartBackground }">
        图表
      </el-button>
    </el-row>
    <el-row style="margin: 10px 0;line-height: 32px">
      <el-col :span="12" style="color:#606266">单位 ：亿元</el-col>
      <el-col :span="12" style="color:#606266;">
        <el-button v-show="excel" style="float:right" icon="el-icon-download" @click="downLoad()">下载</el-button>
      </el-col>
      <el-col :span="12" style="color:#606266;">
        <el-button v-show="echart" style="float:right" icon="el-icon-download" @click="downLoadChart()">下载</el-button>
      </el-col>
    </el-row>
    <!--  表格  -->
    <el-row v-show="form" style="margin-top: 20px">
      <el-col :span="24">
        <div class="table">
          <el-table
            :data="tableData"
            style="width: 100%"
            row-key="assetCd"
            border
            lazy
            :tree-props="{children: 'children'}"
          >
            <el-table-column
              prop="assetNm"
              label="分布类型"
              width="160"
            >
            </el-table-column>
            <el-table-column
              prop="assetScale"
              label="资产规模"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="scalePct"
              label="规模占比"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="scaleComp"
              label="较年初"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="realizedIncome"
              label="已实现收益（减值后）"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="diffIncome"
              label="价差收益"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="interestIncome"
              label="利息（红利）收入"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="fairValueChanges"
              label="为交易公允价值变动"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="adjustGainsLosses"
              label="损益调整"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="extractDiminution"
              label="已记提减值"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="floatProfitLoss"
              label="为销售浮动盈亏"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="floatProfit"
              label="为销售净浮盈"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="floatLoss"
              label="为销售净浮亏"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!--  end 表格  -->
    <!--  图表  -->
    <el-row v-show="chart" style="margin-top: 20px">
      <!--  饼状图  -->
      <el-col :span="8" style="border: 1px solid #ddd;padding: 10px">
        <div id="myChart" class="downloadModule" :style="{width: '400px', height: '400px'}"></div>
      </el-col>
      <!--  饼状图  -->
      <!--  堆叠柱状图  -->
      <el-col :span="8" style="border: 1px solid #ddd;padding: 10px">
        <div id="myChart1" class="downloadModule" :style="{width: '400px', height: '400px'}"></div>
      </el-col>
      <el-col :span="8" style="border: 1px solid #ddd;padding: 10px">
        <div id="myChart2" class="downloadModule" :style="{width: '400px', height: '400px'}"></div>
      </el-col>
      <!--  堆叠柱状图 congxu  -->
    </el-row>
  </div>
</template>

<script>
import { base64toBlob } from '@/utils/validate'

export default {
  name: 'Dashboard',

  data() {
    return {
      excel: true,
      echarts: null,
      echarts1: null,
      echarts2: null,
      echart: false,
      // 点击字体颜色
      activeColor: '#FFFFFF',
      // 点击背景颜色
      activeBackground: '#2a76cd',
      // 默认字体颜色
      chartColor: '#000000',
      // 默认背景颜色
      chartBackground: '#ffffff',
      form: true,
      chart: false,
      // 禁用选择未来日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      // 账户名称数组
      accountOptions: [],
      // 绑定账户名称的值
      account: '',
      options: [],
      // 账户
      value: '',
      // 开始时间
      starDate: '',
      // 表格
      tableData: [
        {
          id: '',
          assetNm: '合计',
          assetScale: '',
          scalePct: '',
          scaleComp: '',
          realizedIncome: '',
          diffIncome: '',
          interestIncome: '',
          fairValueChanges: '',
          adjustGainsLosses: '',
          extractDiminution: '',
          floatProfit: '',
          floatLoss: '',
          children: []
        }],
      // 图表
      option: {
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
        title: {
          text: '大类资产结构',
          left: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} <br/>占比：({d}%)'
        },
        legend: {
          bottom: 5,
          // type: 'scroll',
          left: 'center',
          formatter: function(params) {
            if (params.indexOf('\n') === -1) {
              return params
            } else {
              return '{white|' + params.split('\n')[0] + '}\n' + params.split('\n')[1]
            }
          },

          data: []
        },
        series: [
          {
            name: '固定收益类',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            // animation: false,
            data: []
          }
        ]
      },
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
        title: {
          text: '收益结构',
          left: 'left'
        },
        grid: {
          bottom: '20%',
          containLabel: true
        },
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          // type: 'scroll',
          bottom: -5,
          formatter: function(params) {
            if (params.indexOf('\n') === -1) {
              return params
            } else {
              return '{white|' + params.split('\n')[0] + '}\n' + params.split('\n')[1]
            }
          },
          data: ['损益调整列表', '价差收益列表', '已计提减值列表', '为交易公允价值变动列表', '利息（红利）收入列表', '已实现收益（减值后）列表']
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0
            },
            axisTick: {
              show: false
            },
            data: ['流动性资产', '固收类', '权益类', '不动产', '融资回购', '其他资产'],
            // data: [],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            splitLine: { show: false },
            type: 'value',
            axisLabel: {
              formatter: function() {
                return ''
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '损益调整列表',
            type: 'bar',
            stack: 's',
            data: []
          },
          {
            name: '价差收益列表',
            stack: 's',
            type: 'bar',
            data: []
          },
          {
            name: '已计提减值列表',
            stack: 's',
            type: 'bar',
            data: []
          },
          {
            name: '为交易公允价值变动列表',
            stack: 's',
            type: 'bar',
            data: []
          },
          {
            name: '利息（红利）收入列表',
            stack: 's',
            type: 'bar',
            data: []
          },
          {
            name: '已实现收益（减值后）列表',
            type: 'line',
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
        title: {
          text: '浮动盈亏结构',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          bottom: '20%',
          containLabel: true
        },
        legend: {
          // type: 'scroll',
          bottom: 5,
          data: ['为销售浮动盈亏列表', '为销售净浮盈列表', '为销售净浮亏列表']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: [],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            splitLine: { show: false },
            type: 'value',
            axisLabel: {
              formatter: function() {
                return ''
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '为销售浮动盈亏列表',
            type: 'bar',
            stack: 's',
            data: []
          },
          {
            name: '为销售净浮盈列表',
            stack: 's',
            type: 'bar',
            data: []
          },
          {
            name: '为销售净浮亏列表',
            type: 'line',
            data: []
          }
        ]
      },
      isclick: false,
      arr: []

    }
  },
  mounted() {
    this.time()
    this.getAccountName()
    this.getCharts()
    this.drawLine()
    this.drawLine1()
    this.drawLine2()
  },
  methods: {
    // 表格切换
    switchForm() {
      this.activeColor = '#FFFFFF'
      this.activeBackground = '#2a76cd'
      this.chartColor = '#000000'
      this.chartBackground = '#FFFFFF'
      this.form = true
      this.chart = false
      this.excel = true
      this.echart = false
    },
    // 图表切换
    switchChart() {
      this.activeColor = '#000000'
      this.activeBackground = '#FFFFFF'
      this.chartColor = '#FFFFFF'
      this.chartBackground = '#2a76cd'
      this.form = false
      this.chart = true
      this.excel = false
      this.echart = true
    },
    // 获取账号名称下拉
    getAccountName() {
      this.$api.common.getAccName().then((res) => {
        this.accountOptions = res.data
        this.accountOptions.forEach((item) => {
          // this.account.push(item.accCd)
          this.arr.push(item.accCd)
        })
        this.account = this.arr
        this.$nextTick(() => {
          this.$refs.marketResearchRef.setSelectAll()
        })
        this.getTables(this.account)
        this.getCharts(this.account)
      })
    },
    // 账号名称下拉传值
    getAccount(val) {
      this.account = val
    },
    // 默认时间
    time() {
      var edate = new Date()
      var year = edate.getFullYear()
      var month = edate.getMonth() + 1
      var day = edate.getDate() - 1
      if (month < 10) {
        month = '0' + month
      }
      this.starDate = year + '-' + month + '-' + day
    },
    // 查询表格
    getTables() {
      this.$api.revenueAnalysis.getTable({ accCdList: this.account, queryDate: this.starDate }).then((res) => {
        this.tableData[0].assetNm = res.data.assetNm
        this.tableData[0].assetScale = res.data.assetScale
        this.tableData[0].adjustGainsLosses = res.data.adjustGainsLosses
        this.tableData[0].diffIncome = res.data.diffIncome
        this.tableData[0].extractDiminution = res.data.extractDiminution
        this.tableData[0].fairValueChanges = res.data.fairValueChanges
        this.tableData[0].floatLoss = res.data.floatLoss
        this.tableData[0].floatProfit = res.data.floatProfit
        this.tableData[0].floatProfitLoss = res.data.floatProfitLoss
        this.tableData[0].interestIncome = res.data.interestIncome
        this.tableData[0].realizedIncome = res.data.realizedIncome
        this.tableData[0].scaleComp = res.data.scaleComp
        this.tableData[0].scalePct = res.data.scalePct
        this.tableData[0].assetCd = res.data.assetCd
        this.tableData[0].children = res.data.children
        // 添加%
        // var addId = function(arr) {
        //   if (typeof arr === 'object' || typeof arr === []) {
        //     var result = []
        //     arr.forEach(element => {
        //       var keys = Object.keys(element)
        //       keys.forEach(key => {
        //         if (key !== 'id' && key !== 'children' && key !== 'assetNm') {
        //           if (element[key] === null) {
        //             element[key] = 0
        //           }
        //           element[key] += '%'
        //         }
        //       })
        //       if (element.children) {
        //         addId(element.children)
        //       }
        //       result.push(element.children)
        //     })
        //     return result
        //   }
        //   return arr
        // }
        // addId(this.tableData)
      })
      this.isclick = true
    },
    // 图表查询
    getCharts() {
      if (this.account === '') {
        console.log(1)
      } else {
        this.$api.revenueAnalysis.getChart({ accCdList: this.account, queryDate: this.starDate }).then((res) => {
          // 大类资产结构
          var code = JSON.parse(JSON.stringify(res.data.assetStruct.assetList).replace(/assetCd/g, 'code'))
          var name = JSON.parse(JSON.stringify(code).replace(/assetNm/g, 'name'))
          var data = JSON.parse(JSON.stringify(name).replace(/scalePct/g, 'value'))
          this.option.legend.data = res.data.assetStruct.legendList
          this.option.series[0].data = data
          this.drawLine()
          // 收益结构
          this.option1.xAxis[0].data = res.data.incomeStruct.assetNmList
          this.option1.series[0].data = res.data.incomeStruct.adjustGainsLossesList
          this.option1.series[1].data = res.data.incomeStruct.diffIncomeList
          this.option1.series[2].data = res.data.incomeStruct.extractDiminutionList
          this.option1.series[3].data = res.data.incomeStruct.fairValueChangesList
          this.option1.series[4].data = res.data.incomeStruct.interestIncomeList
          this.option1.series[5].data = res.data.incomeStruct.realizedIncomeList
          this.drawLine1()
          // 浮动盈亏结构
          this.option2.xAxis[0].data = res.data.floatStruct.assetNmList
          this.option2.series[0].data = res.data.floatStruct.floatLossList
          this.option2.series[1].data = res.data.floatStruct.floatProfitList
          this.option2.series[2].data = res.data.floatStruct.floatProfitLossList
          this.drawLine2()
        })
        this.isclick = true
      }
    },
    // 重置
    resetForm() {
      this.getAccountName()
      this.time()
    },
    // 绘制饼图echarts
    drawLine() {
      const self = this
      const echarts = self.$echarts.init(document.getElementById('myChart'))
      echarts.setOption(self.option)
      this.echarts = echarts
      window.onresize = function() {
        echarts.resize()
      }
    },
    // 绘制柱状图echarts
    drawLine1() {
      const self = this
      const echarts = self.$echarts.init(document.getElementById('myChart1'))
      echarts.setOption(self.option1)
      this.echarts1 = echarts
      window.onresize = function() {
        echarts.resize()
      }
    },
    // 绘制柱状图echarts
    drawLine2() {
      const self = this
      const echarts = self.$echarts.init(document.getElementById('myChart2'))
      echarts.setOption(self.option2)
      this.echarts2 = echarts
      window.onresize = function() {
        echarts.resize()
      }
    },
    //  下载 excel
    async downLoad() {
      if (this.isclick === false) {
        this.$message.warning('请先做查询')
      } else {
        this.$api.revenueAnalysis.exportExcel(
          { accCdList: this.account, queryDate: this.starDate },
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
          '大类资产规模及收益分析.xlsx'
        )
      }
    },
    // 下载 pdf
    async downLoadChart() {
      if (this.isclick === '') {
        this.$message.warning('请先做查询')
      } else {
        // 创建参数对象
        const formData = new FormData()
        // 获取文件流 转化为base64格式并添加道对象中
        formData.append('assetStructImage', base64toBlob(this.echarts.getDataURL()))
        formData.append('incomeStructImage', base64toBlob(this.echarts1.getDataURL()))
        formData.append('floatStructImage', base64toBlob(this.echarts2.getDataURL()))
        // 调用接口传参数
        this.$api.revenueAnalysis.exportAllCherts(
          formData,
          'application/pdf',
          '大类资产规模及收益分析.pdf'
        )
      }
    }
  }
}
</script>

<style lang="scss">
.revenueAnalysis {
  // 按钮间距
  .el-button + .el-button {
    margin-left: 20px;
  }

  // 表头错位
  .el-table th.gutter {
    display: table-cell !important;
  }
}
</style>
