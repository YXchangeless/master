<template>
  <div class="assets-scroll revenueAnalysis">
    <div class="title-bar"><span />调仓分析</div>
    <!-- 查询条件 -->
    <el-form class="conditionFilter">
      <el-row>
        <!--   账户 -->
        <el-col :span="8">
          <el-form-item label="账户名称 ：">
            <el-select
              v-model="accCd"
              filterable
              placeholder="请选择"
              @change="selectAcc"
            >
              <el-option
                v-for="item in accountOptions"
                :key="item.accCd"
                :label="item.accNm"
                :value="item.accCd"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!--   end账户 -->
        <!--   模型 -->
        <el-col :span="8">
          <el-form-item label="模型 ：">
            <el-select
              v-model="modelPlanId"
              class="elSelect"
              popper-class="elSelectDropdown "
              multiple
              placeholder="请选择"
              collapse-tags
              filterable
            >
              <el-option
                v-for="item in modelPlanNmList"
                :key="item.modelPlanId"
                :multiple="true"
                :label="item.modelPlanNm"
                :value="item.modelPlanId"
              >
              </el-option>
              <!-- 全选 -->
              <li style="height:34px"></li>
              <div class="selectBtn">
                <el-button size="mini" @click="deselectAll">取消全选</el-button>
                <el-button size="mini" style="width:50px" @click="setSelectAll">全选</el-button>
              </div>
            </el-select>
          </el-form-item>
        </el-col>
        <!--   end模型 -->
        <!--   日期 -->
        <el-col :span="8">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="queryDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
        <!--   end日期 -->
      </el-row>
      <el-row>
        <!--   按钮   -->
        <el-col :span="24" style="text-align: center">
          <el-button
            style="width: 100px;border: 1px solid #EB3344;background-color: #F8E5E7;color: #EB3344"
            @click="assetsClick()"
          >
            资产阈值配置
          </el-button>
          <el-button type="primary" style="background-color: #007BF8" @click="getListBtn()">调仓分析</el-button>
          <!--    弹框  -->
          <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            :close-on-click-modal="false"
          >
            <div class="dialogTitle">
              <div style="float: left;color: #4B556A;font-weight: 600"><span class="spanStyle"></span>
                <span style="color: #007BF8">{{ accNm }}</span>&nbsp;资产权重阈值配置
              </div>
            </div>
            <div style="width: 100%">
              <el-button style="width:120px;float: left;margin: 10px 0" @click="reset()">
                恢复默认上下限
              </el-button>
            </div>
            <div>
              <div class="table">
                <el-table
                  :data="tableData2"
                  style="width: 100%;margin-top: 20px;"
                  :header-cell-style="{color:'#007BF8'}"
                >
                  <el-table-column
                    prop="num"
                    label="序号"
                    width="50"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="assetsName"
                    label="资产类型"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="assetLower"
                    label="下限值（%）"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-form-item>
                        <kyInputNumber
                          v-model="scope.row.assetLower"
                          class="input-box"
                          style="width:80px"
                          :precision="2"
                          :min="0"
                          :max="100"
                        ></kyInputNumber>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="assetUpper"
                    label="上限值（%）"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-form-item>
                        <kyInputNumber
                          v-model="scope.row.assetUpper"
                          class="input-box"
                          style="width:80px"
                          :precision="2"
                          :min="0"
                          :max="100"
                        ></kyInputNumber>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <span class="handleColor">
                        <span style="color: red" @click="del(scope.$index,scope.row)">删除</span>
                      </span>
                    </template>
                  </el-table-column> -->
                </el-table>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false ; canal()">取消</el-button>
              <el-button type="primary" @click="dialogVisible = false;save()">保存</el-button>
            </span>
          </el-dialog>
          <!--    end弹框  -->
        </el-col>
        <!--   end按钮   -->
      </el-row>
      <!--      <el-row>-->
      <!--        <el-button type="primary" @click="exportExcel()">导出当前页数据</el-button>-->
      <!--      </el-row>-->
      <!--      <el-row>-->
      <!--        <el-button type="primary" @click="exportAllExcel()">导出全部数据</el-button>-->
      <!--      </el-row>-->
      <!--   表格  -->
      <el-row style="margin-top: 20px">
        <el-col :span="24">
          <div class="table">
            <el-table
              v-loading="loading"
              :data="tableData"
              style="width: 100%"
              :cell-style="cellStyle"
              :span-method="objectSpanMethod"
              max-height="449px"
              :header-cell-style="{color:'#007BF8'}"
            >
              <template slot="empty" style="border:1px solid #000;width: 100%">
                <img src="../../../assets/Images/nodata.png">
              </template>
              <el-table-column
                prop="date"
                label="操作"
                width="140"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    style="background-color: #007BF8"
                    @click="distribution(scope.$index,scope.row)"
                  >
                    权重分布
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="accName"
                label="账户名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="assetsName"
                label="资产大类"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="recomPct"
                label="资产权重(%)"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="modelName"
                label="模型名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="benchAssetsName"
                label="基准资产大类"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="benchRecomPct"
                label="基准资产权重（%）"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="deviationWeight"
                label="权重偏差（%）"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="waring"
                label="预警提示"
                align="center"
              >
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!--   end表格   -->
      <!-- 分页 -->
      <!-- 分页 -->
      <div class="pageBox">
        <el-pagination
          class="is-background"
          :current-page.sync="pageNum"
          :page-sizes="[2]"
          :page-size="pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <!-- end 分页 -->
      <!--   图表  -->
      <!--   饼图  -->
      <el-row style="margin-top: 20px;" class="resultFrom">
        <el-col :span="12" style="padding-right: 10px">
          <div style="border: 1px solid #ddd">
            <div class="echartsTitle">持仓大类资产权重</div>
            <echartsComponent :data-echarts="option"></echartsComponent>
            <!-- <div id="myChart" :style="{width: '500px', height: '400px'}"></div> -->
          </div>
        </el-col>
        <!--   end饼图  -->
        <!--   饼图1  -->
        <el-col :span="12" style="padding-left: 10px">
          <div style="border: 1px solid #ddd">
            <div class="echartsTitle">基准资产权重</div>
            <echartsComponent :data-echarts="option1"></echartsComponent>
            <!-- <div id="myChart1" :style="{width: '500px', height: '400px'}"></div> -->
          </div>
        </el-col>
        <!--   end饼图1  -->
      </el-row>
      <el-row style="margin-top: 20px;">
        <!--   柱状图  -->
        <el-col :span="12" style="padding-right: 10px">
          <div style="border: 1px solid #ddd">
            <div class="echartsTitle">权重偏差</div>
            <echartsComponent
              height="400px"
              :data-echarts="option2"
            ></echartsComponent>
            <!-- <div id="myChart2" :style="{width: '500px', height: '400px'}"></div> -->
          </div>
        </el-col>
        <!--   end柱状图  -->
        <!--   表格  -->
        <el-col :span="12" style="padding-left: 10px">
          <div class="table">
            <el-table
              :data="tableData1"
              style="width: 100%"
              :header-cell-style="{color:'#007BF8'}"
            >
              <template slot="empty" style="border:1px solid #000;width: 100%">
                <img src="../../../assets/Images/nodata.png">
              </template>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="assetsName"
                label="资产大类（阈值）"
                width="200"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="lower"
                label="下限（%）"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="upper"
                label="上限（%）"
                align="center"
              >
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <!--   end表格  -->
      </el-row>
      <!--   end图表  -->
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
import echartsComponent from '@/components/echarts'
import optimizedMixin from '@/views/globalMixin/optimizedMixin'

export default {
  name: 'Dashboard',
  components: { echartsComponent },
  mixins: [optimizedMixin],
  data() {
    return {
      // 上限
      upperLimit: '',
      // 下限
      lowerLimit: '',
      loading: true,
      pageNum: 1,
      // 每页显示10条记录
      pageSize: 10,
      // 总页数
      total: 0,
      // 当前页数
      pages: 0,
      size: '',
      // 账户名称数组
      accountOptions: [],
      // 绑定账户名称的值
      accCd: '',
      accNm: '',
      // 模型数组
      modelPlanNmList: [],
      // 绑定模型的值
      modelPlanId: [],
      // 日期
      queryDate: '2020-12-31',
      // 禁止选择超出当前日期
      pickerOptions: {
        disabledDate(time) {
          const _now = Date.now()
          return time.getTime() > _now - (24 * 60 * 60 * 1000)
        }
      },
      // 定义名称
      resets: false,
      tableData: [],
      // tableData: [{
      //   date: '1',
      //   accName: '分红',
      //   assetsName: '现金等价物',
      //   recomPct: '10',
      //   waring: '偏低',
      //   stockDate: '2021-3-23',
      //   deviationWeight: '-20',
      //   benchRecomPct: '20',
      //   benchAssetsName: '现金等价物',
      //   modelName: '分红-BL模型'
      // }, {
      //   date: '2',
      //   accName: '分红',
      //   assetsName: '利率债卷',
      //   recomPct: '50',
      //   waring: '偏高',
      //   stockDate: '2021-3-23',
      //   deviationWeight: '30',
      //   benchRecomPct: '30',
      //   benchAssetsName: '利率债卷',
      //   modelName: '分红-BL模型'
      // }, {
      //   date: '3',
      //   accName: '分红',
      //   assetsName: '高收益信用产品',
      //   recomPct: '40',
      //   waring: '正常',
      //   stockDate: '2021-3-23',
      //   deviationWeight: '-10',
      //   benchRecomPct: '50',
      //   benchAssetsName: '高收益信用产品',
      //   modelName: '分红-BL模型'
      // }, {
      //   date: '4',
      //   accName: '分红',
      //   assetsName: '现金等价物',
      //   recomPct: '20',
      //   waring: '偏低',
      //   stockDate: '2021-3-23',
      //   deviationWeight: '-30',
      //   benchRecomPct: '50',
      //   benchAssetsName: '现金等价物',
      //   modelName: '分红-BL模型'
      // }, {
      //   date: '5',
      //   accName: '分红',
      //   assetsName: '利率债卷',
      //   recomPct: '80',
      //   waring: '偏高',
      //   stockDate: '2021-3-23',
      //   deviationWeight: '30',
      //   benchRecomPct: '50',
      //   benchAssetsName: '利率债卷',
      //   modelName: '分红-RP模型'
      // }, {
      //   date: '6',
      //   accName: '分红',
      //   assetsName: '利率债卷',
      //   recomPct: '80',
      //   waring: '偏高',
      //   stockDate: '2021-3-23',
      //   deviationWeight: '30',
      //   benchRecomPct: '50',
      //   benchAssetsName: '利率债卷',
      //   modelName: '分红-RP模型'
      // }],
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
        tooltip: {
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '持仓大类资产权重',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: []
            // data: [
            //   { value: 335, name: '直接访问' },
            //   { value: 310, name: '邮件营销' },
            //   { value: 234, name: '联盟广告' },
            //   { value: 135, name: '视频广告' },
            //   { value: 1548, name: '搜索引擎' }
            // ]
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
        tooltip: {
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '基准资产权重',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: []
            // data: [
            //   { value: 335, name: '直接访问' },
            //   { value: 310, name: '邮件营销' },
            //   { value: 234, name: '联盟广告' },
            //   { value: 135, name: '视频广告' },
            //   { value: 1548, name: '搜索引擎' }
            // ]
          }
        ]
      },
      option2: {
        grid: {
          left: '8%',
          right: '0',
          bottom: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: 20
          },
          data: []
          // data: ['现金等价物', '利率债卷', '高收益信用产品']
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          formatter: function(params) {
            console.log(params)
            return params[0].name + ' : ' + params[0].data + '%'
          },
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        series: [{
          barWidth: '40',
          itemStyle: {
            normal: {
              color: function(params) {
                const colorList = ['#007BF8', '#11EA62', '#FC4757']
                return colorList[params.dataIndex]
              }
            }
          },
          data: [],
          // data: [120, 200, 150],
          type: 'bar',
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      },
      tableData1: [],
      tableData2: [],
      // tableData2: [{
      //   id: '1',
      //   accName: '现金等价物',
      //   assetUpper: '50',
      //   assetLower: '40'
      // }, {
      //   id: '2',
      //   accName: '利率债卷',
      //   assetUpper: '50',
      //   assetLower: '40'
      // }],
      // 对话框
      dialogVisible: false
    }
  },
  created() {
    // 合并单元格
    this.tableDatas()
  },
  mounted() {
    // 页面加载时置顶
    this.topPage()
    // 获取账户
    this.getAccountName()
    // 默认时间
    this.time()
    // 合并单元格
    this.tableDatas()
  },
  methods: {
    // 全选
    setSelectAll() {
      this.modelPlanId = []
      this.modelPlanNmList.map((item) => {
        this.modelPlanId.push(item.modelPlanId)
      })
    },
    // 取消全选
    deselectAll() {
      this.modelPlanId = []
    },
    // 页面置顶
    topPage() {
      document.querySelector('.assets-text').scrollTop = 0
    },
    // 默认时间
    time() {
      this.queryDate = moment(moment().subtract(1, 'days')).format('YYYY-MM-DD')
    },
    // 获取账号名称下拉
    getAccountName() {
      this.$api.common.getAccName().then((res) => {
        this.accountOptions = res.data
        this.accCd = this.accountOptions[0].accCd
        this.accNm = this.accountOptions[0].accNm
        this.loadModelPlanNmList(this.accCd)
        this.getList(this.accCd)
        // this.distributionFirst(this.accCd)
      })
    },
    // 账户变动时
    selectAcc(accCd) {
      if (!accCd) {
        this.modelPlanId = ''
        this.modelPlanNmList = []
      } else {
        this.accCd = accCd
        this.modelPlanId = ''
        this.loadModelPlanNmList([this.accCd])
        this.accountOptions.forEach(item => {
          if (this.accCd === item.accCd) {
            this.accNm = item.accNm
          }
        })
      }
    },
    // 加载方案名称下拉列表数据 @param accCd 账户代码
    loadModelPlanNmList(accCd) {
      this.$api.modelPlanList.queryModelPlanNmList({ accCdList: [this.accCd] }).then((res) => {
        if (res.code === '200') {
          if (res.data.length === 0) {
            this.modelPlanId = ''
            this.modelPlanNmList = ''
          } else {
            this.modelPlanNmList = res.data
            // this.modelPlanId.push(this.modelPlanNmList[0].modelPlanId)
            this.modelPlanNmList.forEach(item => {
              this.modelPlanId.push(item.modelPlanId)
            })
            this.getList(this.modelPlanId)
            // this.distributionFirst(this.modelPlanId[0])
          }
        } else {
          this.$message.error('请求数据有问题')
        }
      })
    },
    // 获取模型
    getModel(val) {
      this.modelPlanId = val
      // console.log(val)
    },
    // 获取表单第一条数据
    getList() {
      let arr = []
      // if (this.accCd === '') {
      //   this.$message.warning('请选择账户')
      // } else if (this.modelPlanId.length === 0) {
      //   let a = this.modelPlanId.toString()
      //   console.log(a)
      //   this.$message.error('请选择模型')
      // } else if (this.queryDate === null) {
      //   this.$message.warning('请选择时间')
      // }
      this.$api.warehouseAdjustment.getTable({
        current: this.pageNum,
        size: 2,
        accCd: this.accCd,
        modelPlanList: this.modelPlanId,
        stockTime: this.queryDate
      }).then(res => {
        // 生成不重复的ID
        function guid() {
          function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
          }

          return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
        }

        if (res.code === '200') {
          this.loading = false
          this.pageNum = res.data.pageNum
          this.pageSize = res.data.pageSize
          this.pages = res.data.pages
          this.size = res.data.size
          this.total = res.data.total
          res.data.list.forEach(item => {
            item.assetsClassList.forEach((value, index) => {
              value.accName = item.accName
              value.modelName = item.modelName
              value.deviationWeight = item.assetsClassList[index].deviationWeight
              value.waring = item.assetsClassList[index].waring
              value.assetsName = item.assetsClassList[index].assetsName
              value.recomPct = item.assetsClassList[index].recomPct
              value.benchRecomPct = item.assetsClassList[index].benchRecomPct
              value.benchAssetsName = item.assetsClassList[index].benchAssetsName
            })
          })
          res.data.list.forEach(item => {
            arr = arr.concat(item.assetsClassList)
          })
          const addId = function(arr) {
            if (typeof arr === 'object') {
              const result = []
              arr.forEach(element => {
                element.date = guid()
                result.push(element)
              })
              return result
            }
            return arr
          }
          addId(this.tableData)
          this.tableData = arr
          this.tableDatas()
          this.distributionFirst()
        } else {
          this.loading = false
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    // 获取列表数据按钮事件
    getListBtn() {
      let arr = []
      if (this.accCd === '') {
        // this.$message.error('请选择账户')
      } else if (this.modelPlanId.length === 0) {
        const a = this.modelPlanId.toString()
        console.log(a)
        // this.$message.error('请选择模型')
      } else if (this.queryDate === null) {
        // this.$message.error('请选择时间')
      }
      this.loading = true
      this.$api.warehouseAdjustment.getTable({
        current: this.pageNum,
        size: 2,
        accCd: this.accCd,
        modelPlanList: this.modelPlanId,
        stockTime: this.queryDate
      }).then(res => {
        // 生成不重复的ID
        function guid() {
          function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
          }

          return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
        }

        if (res.code === '200') {
          this.pageNum = res.data.pageNum
          this.pageSize = res.data.pageSize
          this.pages = res.data.pages
          this.size = res.data.size
          this.total = res.data.total
          res.data.list.forEach(item => {
            item.assetsClassList.forEach((value, index) => {
              value.accName = item.accName
              value.modelName = item.modelName
              value.deviationWeight = item.assetsClassList[index].deviationWeight
              value.waring = item.assetsClassList[index].waring
              value.assetsName = item.assetsClassList[index].assetsName
              value.recomPct = item.assetsClassList[index].recomPct
              value.benchRecomPct = item.assetsClassList[index].benchRecomPct
              value.benchAssetsName = item.assetsClassList[index].benchAssetsName
            })
          })
          res.data.list.forEach(item => {
            arr = arr.concat(item.assetsClassList)
          })
          const addId = function(arr) {
            if (typeof arr === 'object') {
              const result = []
              arr.forEach(element => {
                element.date = guid()
                result.push(element)
              })
              return result
            }
            return arr
          }
          addId(this.tableData)
          this.tableData = arr
          this.tableDatas()
          this.distributionFirst()
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 分页
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getList()
    },
    // 获取当前页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.getList()
    },
    // 设置表格字体颜色
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (row.waring === '偏高' && columnIndex === 8) {
        return 'color: #fd5757'
      } else if (row.waring === '偏低' && columnIndex === 8) {
        return 'color: #67c23A'
      } else if (row.waring === '正常' && columnIndex === 8) {
        return 'color: #1a1a1b'
      }
    },
    // 合并行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      } else if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      } else if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    // 返回需要合并的行数
    tableDatas() {
      let contactDot = 0
      this.spanArr = []
      this.tableData.forEach((item, index) => {
        item.index = index
        if (index === 0) {
          this.spanArr.push(1)
          contactDot = 0
        } else {
          if (item.modelName === this.tableData[index - 1].modelName) {
            this.spanArr[contactDot] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            contactDot = index
          }
        }
      })
    },
    // 弹窗关闭
    handleClose(done) {
      done()
    },
    // 获取第一条echarts数据
    distributionFirst() {
      console.log(this.tableData[0])
      // console.log(this.tableData[0].modelId)
      this.modelId = this.tableData[0].modelId.toString()
      if (this.modelId === '') {
        console.log(1)
      } else {
        this.$api.warehouseAdjustment.getEcahrts({
          accCd: this.accCd,
          modelId: this.modelId,
          stockTime: this.queryDate
        }).then(res => {
          // 持仓大类资产权重
          this.option.series[0].data = res.data.assetsClassList
          const newArr = this.option.series[0].data.map(item => {
            return { value: item.recomPct, name: item.assetsName }
          })
          this.option.series[0].data = newArr
          // 基准资产权重
          this.option1.series[0].data = res.data.benchAssetsClassList
          const newArr1 = this.option1.series[0].data.map(item => {
            return { value: item.recomPct, name: item.assetsName }
          })
          this.option1.series[0].data = newArr1
          // 权重偏差
          const opt2xAxis = []
          const opt2data = []
          res.data.benchAssetsClassList.forEach(item => {
            opt2xAxis.push(item.assetsName)
            opt2data.push(item.deviationWeight)
          })
          this.option2.xAxis.data = opt2xAxis
          this.option2.series[0].data = opt2data
          // 资产大类（阈值）
          this.tableData1 = res.data.assetsBigClassList
        })
      }
    },
    // 查询
    distribution(index, row) {
      this.$api.warehouseAdjustment.getEcahrts({
        accCd: this.accCd,
        modelId: row.modelId,
        stockTime: this.queryDate
      }).then(res => {
        // 持仓大类资产权重
        this.option.series[0].data = res.data.assetsClassList
        const newArr = this.option.series[0].data.map(item => {
          return { value: item.recomPct, name: item.assetsName }
        })
        this.option.series[0].data = newArr
        // this.drawLine()
        // 基准资产权重
        this.option1.series[0].data = res.data.benchAssetsClassList
        const newArr1 = this.option1.series[0].data.map(item => {
          return { value: item.recomPct, name: item.assetsName }
        })
        this.option1.series[0].data = newArr1
        // this.drawLine1()
        // 权重偏差
        const opt2xAxis = []
        const opt2data = []
        res.data.benchAssetsClassList.forEach(item => {
          opt2xAxis.push(item.assetsName)
          opt2data.push(item.deviationWeight)
        })
        this.option2.xAxis.data = opt2xAxis
        this.option2.series[0].data = opt2data
        // this.drawLine2()
        // 资产大类（阈值）
        this.tableData1 = res.data.assetsBigClassList
        this.setPosition()
      })
    },
    // // 获取阈值
    // getThreshold() {
    //   if (this.accCd === '') {
    //     this.dialogVisible = false
    //   }
    //   this.$api.warehouseAdjustment.getAccAssetPctList({id: this.accCd}).then(res => {
    //     this.loading = true
    //     if (res.code === '200') {
    //       this.loading = false
    //       this.tableData2 = res.data
    //       for (let i = 0; i < this.tableData2.length; i++) {
    //         this.tableData2[i].num = i + 1
    //       }
    //       this.$api.warehouseAdjustment.addBatchAccAssetPct(this.tableData2)
    //     } else {
    //       this.loading = false
    //       this.$message.error('暂无数据')
    //     }
    //   })
    // },
    // 资产阈值配置 保存
    save() {
      this.$api.warehouseAdjustment.addBatchAccAssetPct(this.tableData2).then(res => {
        if (res.code === '200') {
          this.$message.success('保存成功')
        } else {
          this.$message.error('保存失败')
        }
      })
    },
    // 资产阈值配置 取消
    canal() {
      this.resets = false
    },
    // 导出当页数据
    // async exportExcel() {
    //   this.$api.warehouseAdjustment.downloadTransferPosAnaly({
    //         current: this.pageNum,
    //         size: 2,
    //         accCd: this.accCd,
    //         modelPlanList: this.modelPlanId,
    //         stockTime: this.queryDate
    //       }, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    //       '收益率分析.xlsx')
    // },
    // // 导出全部数据
    // async exportAllExcel() {
    //   this.$api.warehouseAdjustment.downloadTransferPosAnaly({
    //         current: this.pageNum,
    //         size: 10000,
    //         accCd: this.accCd,
    //         modelPlanList: this.modelPlanId,
    //         stockTime: this.queryDate
    //       }, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    //       '收益率分析.xlsx')
    // },
    // 恢复默认上下限
    getAssetsSet(id, type) {
      this.$api.warehouseAdjustment.getAccAssetPctList({ id: id, type: type }).then(res => {
        this.loading = true
        if (res.code === '200') {
          this.loading = false
          this.tableData2 = res.data
          for (let i = 0; i < this.tableData2.length; i++) {
            this.tableData2[i].num = i + 1
          }
        } else {
          this.loading = false
          this.$message.error('暂无数据')
        }
      })
    },
    // 资产阈值配置 点击按钮事件
    assetsClick() {
      this.resets = false
      this.dialogVisible = true
      this.getAssetsSet(this.accCd, 2)
    },
    // 恢复默认上下限
    reset() {
      this.getAssetsSet(this.accCd, 1)
      this.resets = true
    },
    //  查询跳转
    setPosition() {
      document.querySelector('.assets-text').scrollTop = document.querySelector('.resultFrom').offsetTop - 20
    }
  }
}
</script>

<style lang="scss">
.revenueAnalysis {
  .pageBox .el-input--suffix .el-input__inner {
    width: 100px;
  }

  #myChart, #myChart1, #myChart2 {
    margin-left: 15%;
  }

  .echartsTitle {
    font-size: 18px;
    font-weight: 600;
    color: #007BF8;
    font-family: PingFang;
    padding: 15px 0 0 15px;
  }

  .el-icon-arrow-up:before, .el-icon-date:before {
    color: #007BF8;
  }

  .el-dialog__body {
    padding: 0 20px;
  }

  .el-dialog__header {
    padding: 0
  }

  .dialogTitle {
    width: 100%;
    height: 50px;
    font-size: 16px;
    box-sizing: border-box;
    font-weight: 500;
    color: #4B556A;
    border-bottom: 1px solid #DBDCDC;
    line-height: 50px;
    background: #ffffff;
  }

  .spanStyle {
    width: 4px;
    height: 14px;
    float: left;
    margin-top: 18px;
    margin-right: 8px;
  }

  .table {
    position: static;
  }

  .input-box {
    margin-top: 8px;
  }

  .elSelectDropdown {

    .selectBtn {
      position: absolute;
      bottom: 0;
      left: 0px;
      width: 100%;
      height: 40px;
      border-top: 1px solid #dbdcdc;
      display: flex;
      padding: 6px 10px;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;

      button {
        font-size: 14px;
        height: 28px;
      }
    }
  }
}
</style>
