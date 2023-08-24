<template>
  <div class="modelResult">
    <el-form class="resultFrom">
      <el-row>
        <el-col :span="24" style="padding-right:20px;">
          <el-col :span="12" style="margin-top:0px;">
            <el-form-item label="持仓日期 ：" label-width="87px">
              <el-date-picker
                :clearable="false"
                :editable="false"
                v-model="positionDt"
                @change="positionDtChange"
                value-format="yyyy-MM-dd"
                type="date"
                :picker-options="pickerOptions"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" style="width:100px;float: right;" @click="$emit('save')">保存优化结果</el-button>
          </el-col>
          <el-col :span="24">
            <el-form-item label="仓位对比（单位 ：%）：" style="margin-top:5px" label-width="173px">
            </el-form-item>
            <div class="table">
              <el-table
                :data="indexList"
                style="width: 100%;border-right:none"
              >
                <el-table-column
                  v-for="item in indexCol"
                  :key="item.code"
                  :prop="item.code"
                  :label="item.name"
                  :width="item.width"
                  show-overflow-tooltip
                  header-align="center"
                  :align="(item.code==='hintMsg'||item.code==='assetNm')?'left':'right'"
                >
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-col>
        <el-col v-if="modelCd==='BL'" :span="14" style="margin-top:15px;padding-right:20px">
          <el-form-item label="资产配比（单位 ：%）：" label-width="174px">
          </el-form-item>
          <div class="echartsBox">
            <el-row>
              <el-col :span="24">
                <el-form-item label="模型推荐占比（满足优化目标的最优组合 ：" style="margin:10px 0 0" label-width="287px">
                </el-form-item>
                <echartsComponent :data-echarts="option1Data"></echartsComponent>
              </el-col>
              <el-col :span="24">
                <el-form-item label="持仓配比 ：" style="margin-bottom:0" label-width="92px">
                </el-form-item>
                <echartsComponent :data-echarts="option2Data"></echartsComponent>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col v-if="modelCd==='BL'" :span="10" style="margin-top:15px;padding-right:20px">
          <el-form-item label="有效前沿 ：" label-width="87px">
          </el-form-item>
          <echartsComponent
            :is-click="true"
            height="614px"
            class="echartsBox"
            :data-echarts="option3Data"
            @getIndex="getIndex"
          ></echartsComponent>
        </el-col>
        <!-- 后验收益率  -->
        <el-col v-if="modelCd==='BL'" :span="12" style="margin-top:19px;padding-right:20px;">
          <el-form-item label="后验收益率（年化） :" label-width="147px">
          </el-form-item>
          <echartsComponent
            height="400px"
            style="border:1px solid #dbdcdc"
            :data-echarts="option5Data"
          ></echartsComponent>
        </el-col>
        <!-- end 后验收益率  -->
        <!-- 历史收益率  -->
        <el-col v-if="modelCd==='BL'" :span="12" style="margin-top:19px;padding-right:20px;">
          <el-form-item label="历史收益率（年化） :" label-width="147px">
          </el-form-item>
          <echartsComponent
            height="400px"
            style="border:1px solid #dbdcdc"
            :data-echarts="option4Data"
          ></echartsComponent>
        </el-col>
        <!-- end 历史收益率  -->
      </el-row>
      <el-row>
        <el-col :span="12" style="margin-top:19px;padding-right:20px;" v-if="modelCd==='BL'">
          <el-form-item label="相关性矩阵 :" label-width="93px">
          </el-form-item>
          <TableMatrix :header-list="column" max-height="undefined" :matrix-tabledata="matrixTabledata"></TableMatrix>
        </el-col>
        <el-col :span="12" style="margin-top:19px;padding-right:20px;" v-if="modelCd==='RP'">
          <el-form-item label="历史权重配置（单位 ：%）：" label-width="200px">
          </el-form-item>
          <echartsComponent
            height="400px"
            style="border:1px solid #dbdcdc"
            :data-echarts="option6Data"
          ></echartsComponent>
        </el-col>
        <el-col :span="12" style="margin-top:19px;padding-right:20px;">
          <el-form-item label="回测绩效表现（单位 ：%）:" label-width="190px">
          </el-form-item>
          <TableMatrix :header-list="portPerfTable.column" :matrix-tabledata="portPerfTable.matrixTabledata"
          ></TableMatrix>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import optimizedMixin from '@/views/globalMixin/optimizedMixin.js'
import matrixAndYield from '@/views/globalMixin/matrixAndYield.js'
import rpResult from '@/views/globalMixin/rpResult.js'
// import moment from 'moment'

export default {
  name: 'ModelingOptimized',
  mixins: [optimizedMixin, matrixAndYield, rpResult],
  data() {
    return {
      // 禁止选择超出当前日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > new Date().getTime() - 3600 * 1000 * 24
        }
      },
      // 持仓日期
      positionDt: '',
      // 历史收益率数据
      option4Data: {},
      // 历史收益率配置数据
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
      // 后验收益率数据
      option5Data: {},
      // 历史收益率配置数据
      option5: {
        color: '#124B91',
        legend: {
          data: ['后验收益率'],
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
  props: {
    // 模型id
    modelCd: {
      type: String,
      default: '',
      required: true
    }
  },
  // 页面离开
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.loading && this.loading.close()
    document.querySelector('.assets-container').style.border = 'none'
    next()
  },
  methods: {
    // 持仓日期改变
    positionDtChange() {
      this.$emit('getOptimized')
    },
    // 获取表单数据
    getForm() {
      return new Promise((resolve, reject) => {
        // todo 模型选择 校验
        if (!this.indexList) {
          // 失败
          reject('表单校验失败')
        } else {
          // 成功
          resolve({
            // 暂时只要模型指数占比表格数据
            cacheKey: this.cacheKey,
            indexList: this.indexList,
            positionDt: this.positionDt
          })
        }
      })
    },
    // 设置表单数据
    setForm(form) {
      this.cacheKey = ''
      this.loadData(form)
    },
    // 加载数据
    loadData(result) {
      this.cacheKey = result.cacheKey
      this.positionDt = result.positionDt
      if (this.modelCd === 'BL') {
        this.setIndex(result.indexList)
        this.drowEcharts2(result.positionPctChart)
        this.drowEcharts1(result.recomPctChart)
        this.drowEchartsFront(result.frontChart)
        this.setMatrix(result.relatChart)
        this.drowHistoryYield(result.hisYieldChart)
        this.drowLateYieldChart(result.lateYieldChart)
        this.setPortPerf(result.portPerfTable)
      } else {
        this.setIndex(result.indexList)
        this.setPortPerf(result.portPerfTable)
        this.drowEchartsWeight(result.histWeightChart)
      }
    }
  }
}
</script>
<style scoped>
.modelResult > ul {
    margin-top: 41px;
}

.modelResult > ul > li:nth-child(1) {
    height: 416px;
    width: 100%;
    padding: 0 31px 0 29px;
    overflow: hidden;
    box-sizing: border-box;
}

.modelResult > ul > li:nth-child(2) {
    width: 100%;
    height: 538px;
    padding: 0 31px 0 29px;
    box-sizing: border-box;
    float: left;
}

.modelResult > ul > li:nth-child(2) > ul > li {
    float: left;
    overflow: hidden;
}

.modelResult > ul > li:nth-child(1) > ul li {
    height: 416px;
    width: 50%;
    float: left;
    overflow: hidden;
}

.echartsBox {
    height: 614px;
    width: 100%;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
}
</style>
<style lang="scss">
.modelResult {
  .resultFrom {
    .el-form-item--small.el-form-item {
      margin-bottom: 5px;
    }
  }
}
</style>
