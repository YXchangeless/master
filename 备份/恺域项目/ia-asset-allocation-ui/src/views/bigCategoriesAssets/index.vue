<template>
  <div class="assets-scroll assetsConfigList">
    <div class="title-bar"><span />资产配置列表</div>
    <!-- 查询条件 -->
    <el-form class="conditionFilter">
      <el-row>
        <!-- 账户名称 -->
        <el-col :span="8">
          <el-form-item label="账户名称 ：">
            <kySelect
              ref="marketResearchRef"
              label="accNm"
              value="accCd"
              :v-model="value"
              :options="accountOptions"
              @visibleChange="getId"
            ></kySelect>
          </el-form-item>
        </el-col>
        <!-- end 账户名称 -->
        <!-- 模型 -->
        <el-col :span="8">
          <el-form-item label="模型 ：">
            <kySelect
              ref="modelPlanRef"
              label="modelPlanNm"
              value="modelPlanId"
              :v-model="value1"
              :options="modelOptions"
              @visibleChange="getModel"
            ></kySelect>
          </el-form-item>
        </el-col>
        <!-- end 模型 -->
        <!-- 查询 重置 按钮 -->
        <el-col :span="8" class="query">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="onRest">重置</el-button>
        </el-col>
        <!-- end  查询 重置 按钮 -->
      </el-row>
    </el-form>
    <!-- end 查询条件 -->
    <!-- 表格 -->
    <div class="table">
      <el-table
        v-loading="loading"
        element-loading-text="加载中"
        :data="tableData"
        class="assTable"
        max-height="449px"
        fit
        style="width: 100%"
      >
        <template slot="empty">
          <img src="../../assets/Images/nodata.png" alt="">
        </template>
        <el-table-column
          type="index"
          label="序号"
          align="center"
        />
        <el-table-column prop="accNm" label="账户名称" align="center" />
        <el-table-column prop="modelPlanNm" label="模型名称" align="center" />
        <el-table-column prop="modelNm" label="模型类型" align="center" />
        <el-table-column prop="riskIndicNm" label="风险指数" align="center" />
        <el-table-column
          prop="assetIndexShow"
          label="资产选择"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="assetTypeShow"
          label="资产大类"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column prop="calcTime" label="计算时间" width="140px" align="center" />
        <el-table-column fixed="right" label="操作" width="70px" align="center">
          <template slot-scope="scope">
            <span class="handleColor">
              <span
                @click="getModelPlanId(scope.row)"
              >查看</span></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- end表格 -->
    <!-- 分页 -->
    <div class="pageBox">
      <el-pagination
        class="is-background"
        :current-page.sync="pageNum"
        :page-sizes="[10, 20, 30, 40]"
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
    <!-- 仓位对比 -->
    <el-form v-show="mshow" class="resultFrom">
      <el-row>
        <!-- 仓位对比 -->
        <el-col :span="24">
          <div>
            <el-form-item label="仓位对比（单位 ：%）：" style="margin-top:15px;"
                          label-width="174px"
            >
              <el-form-item label="持仓日期 ：" class="positionFont"><span
                style="font-size: 12px;color:#606266"
              >{{ positionDt }}</span>
              </el-form-item>
            </el-form-item>
          </div>
          <div class="table">
            <el-table
              v-loading="loading"
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
        <!-- end 仓位对比 -->
        <!-- 资产配比 -->
        <el-col v-if="modelCd==='BL'" :span="14" style="margin-top:15px;padding-right:20px">
          <el-form-item label="资产配比（单位 ：%） ：" label-width="177px">
          </el-form-item>
          <div class="echartsBox">
            <el-row>
              <!-- 模型推荐占比 -->
              <el-col :span="24">
                <el-form-item label="模型推荐占比（满足优化目标的最优组合） ：" style="margin:10px 0 0" label-width="303px">
                </el-form-item>
                <echartsComponent :data-echarts="option1Data"></echartsComponent>
              </el-col>
              <!-- end 模型推荐占比 -->
              <!-- 持仓配比 -->
              <el-col :span="24">
                <el-form-item label="持仓配比 ：" style="margin-bottom:0" label-width="91px">
                </el-form-item>
                <echartsComponent :data-echarts="option2Data"></echartsComponent>
              </el-col>
              <!-- end 持仓配比 -->
            </el-row>
          </div>
        </el-col>
        <!-- end 资产配比 -->
        <!-- 有效前沿 -->
        <el-col v-if="modelCd==='BL'" :span="10" style="padding-left:20px;margin-top:15px">
          <el-form-item label="有效前沿 ：" label-width="91px">
          </el-form-item>
          <echartsComponent
            :key="1"
            :is-click="true"
            class="echartsBox"
            height="614px"
            :data-echarts="option3Data"
            @getIndex="getIndex"
          ></echartsComponent>
        </el-col>
        <!-- end 有效前沿 -->
        <!-- 后验收益率  -->
        <el-col v-if="modelCd==='BL'" :span="12" style="margin-top:15px;padding-right:20px;">
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
        <el-col v-if="modelCd==='BL'" :span="12" style="margin-top:15px;">
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
        <!-- 相关性矩阵 -->
        <el-col v-if="modelCd==='BL'" :span="12" style="margin-top:15px;padding-right:20px;">
          <el-form-item label="相关性矩阵 :" label-width="94px">
          </el-form-item>
          <TableMatrix :header-list="column" :matrix-tabledata="matrixTabledata" :loading="loading"></TableMatrix>
        </el-col>
        <el-col v-if="modelCd==='RP'" :span="12" style="margin-top:15px;padding-right:20px;">
          <el-form-item label="历史权重配置（单位 ：%）：" label-width="201px">
          </el-form-item>
          <echartsComponent
            height="400px"
            style="border:1px solid #dbdcdc"
            :data-echarts="option6Data"
          ></echartsComponent>
        </el-col>
        <el-col :span="12" style="margin-top:15px;">
          <el-form-item label="回测绩效表现（单位 ：%）:" label-width="191px">
          </el-form-item>
          <TableMatrix
            :header-list="portPerfTable.column"
            :matrix-tabledata="portPerfTable.matrixTabledata"
          ></TableMatrix>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import optimizedMixin from '@/views/globalMixin/optimizedMixin.js'
import historyYield from '@/views/globalMixin/matrixAndYield.js'
import rpResult from '@/views/globalMixin/rpResult.js'
import echartsComponent from '@/components/echarts'

export default {
  name: 'Dashboard',
  components: { echartsComponent },
  mixins: [optimizedMixin, historyYield, rpResult],
  data() {
    return {
      // 是否loading加载
      loading: true,
      // 持仓日期
      positionDt: '',
      // 是否展示仓位对比
      mshow: true,
      // 表单
      tableData: [],
      // 模型
      modelOptions: [],
      // 账户绑定值
      value: '',
      // 账户数组
      accountOptions: [],
      // 模型数组
      value1: '',
      // 默认选择当前页
      pageNum: 1,
      // 每页显示10条记录
      pageSize: 10,
      // 总页数
      total: 0,
      // 当前页数
      pages: 0,
      // 获取模型下拉传值Id
      accCdList: [],
      modelCd: ''
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    // 获取账户名称下拉
    this.getasset()
    // 获取资产配置列表
    this.getList()
    // 获取模型下拉
    this.getId()
  },
  methods: {
    // 获取账户名称下拉
    getasset() {
      this.$api.common.getAccName().then((res) => {
        this.accountOptions = res.data
      })
    },
    // 获取模型下拉
    getId(accCdList) {
      this.accCdList = accCdList
      this.$api.assets.getAccountName({ accCdList: this.accCdList }).then((res) => {
        this.modelOptions = res.data
        this.$refs.modelPlanRef.reset()
      })
    },
    // 获取模型方案
    getModel(modelPlanIdList) {
      this.modelPlanIdList = modelPlanIdList
    },
    // 获取资产配置列表
    getList() {
      this.$api.assets.getAssetList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        accCdList: this.accCdList,
        modelPlanIdList: this.modelPlanIdList
      }).then((res) => {
        if (res.code === '200') {
          this.loading = false
          this.tableData = res.data.list
          this.pageNum = res.data.pageNum // 当前页
          this.pages = res.data.pages // 总页数
          this.pageSize = res.data.pageSize
          this.total = res.data.total
          this.modelCd = this.tableData[0].modelCd
          this.getData(this.tableData[0].modelPlanId)
        } else if (res.code !== '200') {
          this.loading = false
          this.$message.error('数据请求错误！')
        }
      })
    },
    // 查询按钮
    onSubmit() {
      this.loading = true
      this.$api.assets.searchList({
        pageNum: 1,
        pageSize: 10,
        accCdList: this.accCdList,
        modelPlanIdList: this.modelPlanIdList
      }).then((res) => {
        if (res.data.list.length === 0) {
          this.mshow = false
        } else {
          this.mshow = true
        }
        if (res.code === '200') {
          this.loading = false
          this.tableData = res.data.list
          this.pageNum = res.data.pageNum // 当前页
          this.pages = res.data.pages // 总页数
          this.pageSize = res.data.pageSize
          this.total = res.data.total
        } else if (res.code !== '200') {
          this.loading = false
          this.$message.error('数据请求错误！')
        }
      })
    },
    // 重置按钮
    onRest() {
      this.$refs.marketResearchRef.reset()
      this.$refs.modelPlanRef.reset()
    },
    // 分页
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getList()
    },
    // 获取当前页
    handleCurrentChange(pageNum) {
      this.getList()
    },
    // 查看
    getModelPlanId(modelPlan) {
      this.modelCd = modelPlan.modelCd
      this.getData(modelPlan.modelPlanId)
      document.querySelector('.assets-text').scrollTop = document.querySelector('.resultFrom').offsetTop
    },
    // 获取表单
    getData(modelPlanId) {
      // 调用市场研究的接口的数据 展示后验
      if (this.modelCd === 'BL') {
        this.$api.assets.getBlResult(modelPlanId).then((res) => {
          if (res.code === '200') {
            let result = res.data
            this.loading = false
            this.positionDt = result.positionDt
            this.setIndex(result.indexList)
            this.drowEcharts2(result.positionPctChart)
            this.drowEcharts1(result.recomPctChart)
            this.drowEchartsFront(result.frontChart)
            this.setMatrix(result.relatChart)
            this.drowHistoryYield(result.hisYieldChart)
            this.drowLateYieldChart(result.lateYieldChart)
            this.setPortPerf(result.portPerfTable)
          } else if (res.code !== '200') {
            this.loading = false
            this.positionDt = ''
            this.$message.error('数据请求错误！')
          }
        })
      } else {
        this.$api.assets.getRpResult(modelPlanId).then((res) => {
          if (res.code === '200') {
            let result = res.data
            this.positionDt = result.positionDt
            this.loading = false
            this.setIndex(result.indexList)
            this.setPortPerf(result.portPerfTable)
            this.drowEchartsWeight(result.histWeightChart)
          } else if (res.code !== '200') {
            this.loading = false
            this.positionDt = ''
            this.$message.error('数据请求错误！')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.echartsBox {
    width: 100%;
    height: 614px;
    border: 1px solid #dbdcdc;
}

label {
    font-weight: 0;
}
</style>
<style lang="scss">
.assetsConfigList {
  .resultFrom {
    .el-form-item--small.el-form-item {
      margin-bottom: 5px;
    }

    .positionFont {
      .el-form-item__label {
        font-size: 12px
      }
    }
  }
}
</style>
