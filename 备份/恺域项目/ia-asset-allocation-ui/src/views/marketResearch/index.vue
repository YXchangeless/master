<template>
  <div class="assets-scroll marketResearch">
    <div class="title-bar"><span />市场研究</div>
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
              :v-model="account"
              :options="accountOptions"
              @visibleChange="getId($event)"
            ></kySelect>
          </el-form-item>
        </el-col>
        <!-- end账户名称 -->
        <!-- 模型 -->
        <el-col :span="8">
          <el-form-item label="模型 ：">
            <kySelect
              ref="modelPlanRef"
              label="modelPlanNm"
              value="modelPlanId"
              :options="modelOptions"
              @visibleChange="getModel"
            ></kySelect>
          </el-form-item>
        </el-col>
        <!-- end模型 -->
        <!-- 查询 重置 按钮-->
        <el-col :span="8" class="query">
          <el-button type="primary" class="btnSize" @click="onSubmit">查询</el-button>
          <el-button class="btnSize" @click="resetForm()">重置</el-button>
        </el-col>
        <!-- end查询 重置 按钮-->
      </el-row>
    </el-form>
    <!-- end查询条件 -->
    <!-- 表单 -->
    <div class="table">
      <el-table
        v-loading="loading"
        element-loading-text="加载中"
        :data="tableData"
        style="width: 100%"
        max-height="449px"
        fit
      >
        <template slot="empty" style="border:1px solid #000">
          <img src="../../assets/Images/nodata.png" alt="">
        </template>
        <el-table-column
          fixed
          type="index"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="accNm"
          label="账户名称"
          align="center"
          width="100px"
        />
        <el-table-column
          prop="modelPlanNm"
          label="模型名称"
          align="center"
          width="200px"
          show-overflow-tooltip
        />
        <el-table-column
          prop="assetTypeShow"
          label="资产大类"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="calcTime"
          label="计算时间"
          align="center"
          width="150px"
        />
        <el-table-column label="操作" align="center" width="100px">
          <template slot-scope="scope">
            <span class="handleColor">
              <span
                @click="getModelPlanId(scope.row)"
              >
                查看</span>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- end表单 -->
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
    <!-- end分页 -->
    <el-form v-show="mshow" class="resultFrom">
      <el-row v-if="modelCd==='BL'">
        <!-- 相关性矩阵 -->
        <el-col :span="14" style="margin-top:19px;padding-right:20px;">
          <el-form-item label="相关性矩阵 :" label-width="93px">
          </el-form-item>
          <TableMatrix :header-list="column" :matrix-tabledata="matrixTabledata" :loading="loading"></TableMatrix>
        </el-col>
        <!-- end相关性矩阵 -->
        <!-- echarts图表 -->
        <el-col :span="10" style="margin-top:19px;">
          <el-form-item label="历史收益率（年化） :" label-width="150px">
          </el-form-item>
          <echartsComponent
            height="400px"
            style="border:1px solid #dbdcdc"
            :data-echarts="option4Data"
          ></echartsComponent>
        </el-col>
        <!-- end Echarts图表 -->
      </el-row>
      <el-row v-else>
        <el-col :span="12" style="margin-top:19px;padding-right:20px;">
          <el-form-item label="历史权重配置（单位 ：%） ：" label-width="203px">
          </el-form-item>
          <echartsComponent
            height="400px"
            style="border:1px solid #dbdcdc"
            :data-echarts="option6Data"
          ></echartsComponent>
        </el-col>
        <el-col :span="12" style="margin-top:19px;">
          <el-form-item label="回测绩效表现（单位 ：%） ：" label-width="203px">
          </el-form-item>
          <TableMatrix :header-list="portPerfTable.column" :matrix-tabledata="portPerfTable.matrixTabledata"
          ></TableMatrix>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
import TableMatrix from '../../components/table/TableMatrix.vue'
import matrixAndYield from '@/views/globalMixin/matrixAndYield.js'
import rpResult from '@/views/globalMixin/rpResult.js'
import echartsComponent from '@/components/echarts'

export default {
  name: 'Dashboard',
  components: { TableMatrix, echartsComponent },
  mixins: [matrixAndYield, rpResult],
  data() {
    return {
      // 是否loading加载
      loading: true,
      // 是否显示echarts图表
      eshow: true,
      // 是否显示矩阵图表
      mshow: true,
      // 模型cd
      modelCd: '',
      // 账户名称数组
      accountOptions: [],
      // 绑定账户名称的值
      account: '',
      // 模型数组
      modelOptions: [],
      // 绑定模型的值
      model: '',
      // 模型value
      modelPlanId: [],
      // 默认选择当前页
      pageNum: 1,
      // 每页显示10条记录
      pageSize: 10,
      // 总页数
      total: 0,
      // 当前页数
      pages: 0,
      // 表单数据
      tableData: [],
      // 矩阵表头
      column: [],
      // 矩阵数据
      matrixTabledata: [],
      // 账户ID
      accCdList: [],
      // 模型ID
      modelPlanIdList: []
    }
  },
  mounted() {
    // 获取表单数据
    this.getList()
    // 获取账号名称下拉
    this.getAccountName()
    // 获取模型下拉
    this.getId()
  },
  methods: {
    // 获取账号名称下拉
    getAccountName() {
      // console.log(this.$api.common.getAccName())
      this.$api.common.getAccName().then((res) => {
        this.accountOptions = res.data
      })
    },
    // 获取模型方案
    getModel(modelPlanIdList) {
      this.modelPlanIdList = modelPlanIdList
    },
    // 获取模型
    getId(accCdList) {
      this.accCdList = accCdList
      this.$api.market.getModelList({ accCdList: this.accCdList }).then((res) => {
        this.modelOptions = res.data
        this.$refs.modelPlanRef.reset()
      })
    },
    // 获取列表
    getList() {
      this.$api.market.marketList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        accCdList: this.accCdList,
        modelPlanIdList: this.modelPlanIdList
      }).then((res) => {
        if (res.code === '200') {
          this.loading = false
          this.loading = false
          this.tableData = res.data.list
          this.pageNum = res.data.pageNum // 当前页
          this.pages = res.data.pages // 总页数
          this.pageSize = res.data.pageSize
          this.total = res.data.total
          const modelPlanId = res.data.list[0].modelPlanId
          this.modelCd = res.data.list[0].modelCd
          this.getFrist(modelPlanId)
        } else if (res.code !== '200') {
          this.$message.error('数据请求失败！')
        }
      })
    },
    // 查询按钮
    onSubmit() {
      this.loading = true
      this.$api.market.searchList({
        accCdList: this.accCdList,
        modelPlanIdList: this.modelPlanIdList,
        pageNum: 1,
        pageSize: 10
      }).then((res) => {
        if (res.code === '200') {
          this.loading = false
        }
        if (res.data.list.length === 0) {
          this.eshow = false
          this.mshow = false
        } else {
          this.eshow = true
          this.mshow = true
        }
        this.tableData = res.data.list
        this.pageNum = res.data.pageNum // 当前页
        this.pages = res.data.pages // 总页数
        this.pageSize = res.data.pageSize
        this.total = res.data.total
      })
    },
    // 重置按钮
    resetForm() {
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
      this.getList(pageNum)
    },
    // 查看
    getModelPlanId(val) {
      this.modelCd = val.modelCd
      const modelPlanId = val.modelPlanId
      this.getData(modelPlanId, true)
    },
    setPosition() {
      document.querySelector('.assets-text').scrollTop = document.querySelector('.resultFrom').offsetTop
    },
    getData(modelPlanId, val) {
      if (this.modelCd === 'BL') {
        this.$api.market.getBlResult(modelPlanId).then((res) => {
          if (res.code === '200') {
            let result = res.data
            val && this.setPosition()
            this.setMatrix(result.relatChart)
            this.drowHistoryYield(result.hisYieldChart)
          } else if (res.code !== '200') {
            this.loading = false
            this.$message.error('数据请求错误！')
          }
        })
      } else {
        this.$api.market.getRpResult(modelPlanId).then((res) => {
          if (res.code === '200') {
            let result = res.data
            this.loading = false
            val && this.setPosition()
            this.setPortPerf(result.portPerfTable)
            this.drowEchartsWeight(result.histWeightChart)
          } else if (res.code !== '200') {
            this.loading = false
            this.$message.error('数据请求错误！')
          }
        })
      }
    },
    // 绘制矩阵图表
    getFrist(modelPlanId) {
      this.getData(modelPlanId)
    }
  }
}
</script>

<style lang="scss">
.marketResearch {
  .resultFrom .el-form-item--small.el-form-item {
    margin-bottom: 5px;
  }

  .assets-container {
    background-color: #eee;
  }

  .dashboard-text {
    background-color: #ffffff;
  }

  .selectFrom {
    display: flex;
    margin-left: 20px;
  }

  .marketFrom {
    padding: 0 20px;
  }

  .el-form-item__label {
    font-weight: normal;
  }

  .sta_bar {
    width: 48%;
    height: 500px;
    border: 1px solid #ddd;
  }

  .title_all {
    margin-top: 30px;
  }

  .titleHistory {
    margin-top: 20px;
    color: #000;
    font-size: 10px;
  }

  .his_title {
    float: left;
    color: #000;
    font-size: 10px;
  }

  .mat_title {
    float: right;
    width: 50%;
    color: #000;
    font-size: 10px;
  }

  .statistics {
    display: flex;
    padding: 0 0 40px 0;
  }

  .rever {
    font-size: 12px;
    font-weight: 400;
    color: #4b556a;
    display: block;
    float: left;
    line-height: 28px;
  }

  .padding0 {
    font-size: 12px;
    font-weight: 400;
    color: #4b556a;
    display: block;
    float: left;
    line-height: 28px;
  }

  .his_title {
    width: 48%;
  }

  .mat {
    height: 500px;
  }

  .mat_title {
    margin-right: 18px;
  }
}
</style>

