<template>
  <div class="assets-scroll">
    <div class="title-bar"><span /> 模型方案列表</div>
    <el-form class="conditionFilter">
      <el-row>
        <!-- 模型名称 -->
        <el-col :span="8">
          <el-form-item label="模型名称 ：">
            <kySelect
              ref="modelPlanRef"
              label="modelPlanNm"
              value="modelPlanId"
              :options="modelPlanNmList"
              @visibleChange="visibleChange"
            ></kySelect>
          </el-form-item>
        </el-col>
        <!-- end模型名称 -->
        <!-- 查询 重置按钮 -->
        <el-col :span="8" class="query">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-col>
        <!-- end 查询 重置按钮 -->
      </el-row>
    </el-form>
    <!-- 新增 -->
    <div class="unit">
      <div>
      </div>
      <el-button class="el-icon-plus" @click="handleModelPlanNew">新增</el-button>
    </div>
    <!-- end新增 -->
    <!-- 表单 -->
    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        row-key="modelPlanId"
        fit
        max-height="449px"
        element-loading-text="加载中"
      >
        <template slot="empty">
          <img src="../../../assets/Images/nodata.png" alt="">
        </template>
        <el-table-column
          fixed
          type="index"
          label="序号"
          align="center"
        />
        <el-table-column prop="modelPlanNm" label="模型名称" align="center" />
        <el-table-column prop="modelNm" label="模型类型" width="90px" align="center" />
        <el-table-column prop="riskIndicNm" label="风险指数" width="90px" align="center" />
        <el-table-column
          prop="assetIndexShow"
          label="资产选择"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="assetTypeShow"
          label="资产对应大类"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column prop="calcTime" label="计算时间" width="140px" align="center" />
        <el-table-column fixed="right" label="操作" align="center" width="280px">
          <template slot-scope="scope">
            <span class="handleColor">
              <span
                @click="handleModelPlanView(scope.row.modelPlanId,scope.row.modelCd)"
              >查看</span>
              <span
                @click="handleModelPlanCopy(scope.row.modelPlanId,scope.row.modelCd)"
              >复制</span>
              <span
                @click="handleModelPlanModify(scope.row.modelPlanId,scope.row.modelCd)"
              >优化</span>
              <span
                @click="handleModelPlanChgNm(scope.row)"
              >修改名称</span>
              <span
                class="del"
                @click="handleModelPlanDelete(scope.row)"
              >删除</span>
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
        :current-page.sync="page.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!-- 分页 -->
  </div>
</template>
<script>
export default {
  name: 'ModelPlanList',
  data() {
    return {
      // 记载中标记
      loading: true,
      /** 表格数据 */
      tableData: [],
      /** 模型方案名称下拉列表 */
      modelPlanNmList: [],
      /** 模型方案名称下拉绑定值 */
      modelPlanId: [],
      /** 分页对象 */
      page: {
        pageNum: 1, // 默认选择当前页
        pageSize: 10, // 每页显示两条
        total: 0,
        pages: 0,
        size: 0
      }
    }
  },
  created() {
    this.loadModelPlanNmList()
    this.loadTableData()
  },
  methods: {
    // 下拉框收回
    visibleChange(val) {
      this.modelPlanId = val
    },
    /** 加载模型方案名称列表 */
    loadModelPlanNmList() {
      this.$api.modelPlanList.queryModelPlanNmList({ accCdList: [] }).then((res) => {
        this.modelPlanNmList = res.data || []
      })
    },
    /** 加载模型方案列表 */
    loadTableData() {
      this.$api.modelPlanList.queryModelPlanList({
        modelPlanIdList: this.modelPlanId,
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      }).then((res) => {
        if (res.code === '200') {
          this.loading = false
          this.tableData = res.data.list
          this.page.total = res.data.total
          this.page.pages = res.data.pages
          this.page.size = res.data.size
          this.page.pageSize = res.data.pageSize
        } else if (res.code !== '200') {
          this.loading = false
          this.$message.error('数据请求错误！')
        }
      })
    },
    /** 重置查询条件 */
    resetForm() {
      // this.modelPlanId = []
      this.$refs.modelPlanRef.reset()
    },
    /** 查询模型方案列表事件 */
    onSubmit() {
      this.page.pageNum = 1
      this.page.pageSize = 10
      this.loading = true
      this.loadTableData()
    },
    // 总页数发生变化
    handleSizeChange(val) {
      this.page.pageNum = 1
      this.page.pageSize = val
      this.loadTableData()
    },
    // 页数放生变化
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.loadTableData()
    },
    /**
     * 处理事件 模型方案新增
     * @param modelPlanId 模型方案编号
     */
    handleModelPlanNew(modelPlanId) {
      this.$router.push({
        path: '/modelConfig/modelPlanConfig/new'
      })
    },
    /**
     * 处理事件 模型方案查看
     * @param modelPlanId 模型方案编号
     */
    handleModelPlanView(modelPlanId, modelCd) {
      this.$router.push({
        path: '/modelConfig/modelPlanConfig/view',
        query: {
          id: modelPlanId,
          modelCd: modelCd
        }
      })
    },
    //  复制模型方案
    handleModelPlanCopy(modelPlanId, modelCd) {
      this.$router.push({
        path: '/modelConfig/modelPlanConfig/copy',
        query: {
          id: modelPlanId,
          modelCd: modelCd
        }
      })
    },
    /**
     * 处理事件 模型方案修改
     * @param modelPlanId 模型方案编号
     */
    handleModelPlanModify(modelPlanId, modelCd) {
      this.$router.push({
        path: '/modelConfig/modelPlanConfig/edit',
        query: {
          id: modelPlanId,
          modelCd: modelCd
        }
      })
    },
    /**
     * 处理事件 模型方案名称修改
     * @param row 模型方案行
     */
    handleModelPlanChgNm(row) {
      this.$prompt('', '请输入模型方案名称', {
        inputValue: row.modelPlanNm,
        closeOnClickModal: false
      })
        .then(({ value }) => {
          this.$api.modelPlanList.updateModelPlanNm({
            modelPlanId: row.modelPlanId,
            modelPlanNm: value
          }).then(() => {
            this.$message.success('模型方案名称修改成功')
            // todo 考虑优化成单行刷新
            // 暂时重新查询
            this.loadTableData()
            this.loadModelPlanNmList()
          })
        })
        .catch(() => {
        })
    },
    /**
     * 处理事件 模型方案删除
     * @param modelPlanId 模型方案编号
     */
    handleModelPlanDelete(val) {
      if (val.modelCd === 'BL') {
        const modelPlanId = val.modelPlanId
        this.$confirm('是否要删除', '提示', { closeOnClickModal: false }).then(() => {
          this.$api.modelPlanList.deleteBLModel(modelPlanId).then(() => {
            this.$message.success('模型方案删除成功')
            // 重新查询
            this.$refs.modelPlanRef.reset()
            this.loadModelPlanNmList()
            this.loadTableData()
          })
        })
      } else {
        const modelPlanId = val.modelPlanId
        this.$confirm('是否要删除', '提示', { closeOnClickModal: false }).then(() => {
          this.$api.modelPlanList.deleteRPModel(modelPlanId).then(() => {
            this.$message.success('模型方案删除成功')
            // 重新查询
            this.$refs.modelPlanRef.reset()
            this.loadModelPlanNmList()
            this.loadTableData()
          })
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
