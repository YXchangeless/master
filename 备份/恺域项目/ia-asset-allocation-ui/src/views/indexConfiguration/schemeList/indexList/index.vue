<template>
  <div class="assets-scroll">
    <div class="title-bar"><span /> 指数方案列表</div>
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
              :v-model="selectedAccCd"
              :options="accNmList"
              @visibleChange="selectAcc"
            ></kySelect>
          </el-form-item>
        </el-col>
        <!-- end 账户名称 -->
        <!-- 方案名称 -->
        <el-col :span="8">
          <el-form-item label="方案名称 ：">
            <kySelect
              ref="modelPlanRef"
              label="planNm"
              value="indexPlanId"
              :v-model="selectedPlanId"
              :options="planNmList"
              @visibleChange="getModel"
            ></kySelect>
          </el-form-item>
        </el-col>
        <!-- end 方案名称 -->
        <!-- 查询重置 按钮 -->
        <el-col :span="8" class="query">
          <el-button
            type="primary"
            class="btnSize"
            @click="onSubmit"
          >查询
          </el-button>
          <el-button class="btnSize" @click="resetForm()">重置</el-button>
        </el-col>
        <!-- end 查询重置 按钮 -->
      </el-row>
    </el-form>
    <!-- end 查询条件 -->
    <!-- 新增 按钮 -->
    <div class="unit">
      <div></div>
      <el-button class="el-icon-plus" @click="newIndexPlan">新增</el-button>
    </div>
    <!-- end 新增 按钮 -->
    <!-- 表格 -->
    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        fit
        max-height="449px"
        element-loading-text="加载中"
      >
        <template slot="empty">
          <img src="../../../../assets/Images/nodata.png" alt="">
        </template>
        <el-table-column
          type="index"
          label="序号"
          align="center"
        />
        <el-table-column prop="planNm" label="方案名称" align="center" show-overflow-tooltip />
        <el-table-column prop="accNm" label="账户名称" align="center" show-overflow-tooltip />
        <el-table-column prop="updateUser" label="更新人" align="center" />
        <el-table-column prop="updateDt" label="更新时间" align="center" show-overflow-tooltip />
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <span class="handleColor">
              <span
                @click="viewIndexPlan(scope.row)"
              >查看</span>
              <span
                @click="copyIndexPlan(scope.row)"
              >复制</span>
              <span
                @click="modify(scope.row)"
              >修改</span>
              <span
                class="del"
                @click="delData(scope.row)"
              >删除</span>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- end 表格 -->
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SchemeList',
  data() {
    return {
      // 是否loading加载
      loading: true,
      // 表格数据
      tableData: [],
      // 账户名称列表
      accNmList: [],
      // 方案名称列表
      planNmList: [],
      // 选中的账户代码
      selectedAccCd: [],
      // 选择的方案名称的编号
      selectedPlanId: [],
      // 默认选择当前页
      pageNum: 1,
      // 每页显示的数量
      pageSize: 10,
      // 总页数
      pages: 0,
      // 总记录数
      total: 0,
      // 模型方案value
      indexPlanId: '',
      // 账户Id
      accCdList: [],
      // 模型Id
      indexPlanIdList: []
    }
  },
  computed: {
    ...mapGetters(['name'])// 名称
  },
  created() {
    const _this = this
    //  加载表格数据
    _this.loadTableData()
    // 加载账户下拉列表数据
    _this.loadAccNmList()
    // 加载方案名称下拉列表数据
    _this.loadPlanNmList()
  },
  methods: {
    //  加载表格数据
    loadTableData() {
      this.$api.indexPlanList.queryIndexPlanList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        indexPlanIdList: this.indexPlanIdList,
        accCdList: this.accCdList
      }).then((res) => {
        if (res.code === '200') {
          this.loading = false
          const _this = this
          const data = res.data.list
          _this.pages = res.data.pages
          _this.tableData = data
          _this.pages = res.data.pages
          _this.total = res.data.total
        } else if (res.code !== '200') {
          this.loading = false
          this.$message.error('数据请求错误！')
        }
      })
    },
    // 查询
    onSubmit() {
      this.loading = true
      this.$api.indexPlanList.queryIndexPlanList({
        pageNum: 1,
        pageSize: 10,
        indexPlanIdList: this.indexPlanIdList,
        accCdList: this.accCdList
      }).then((res) => {
        if (res.code === '200') {
          this.loading = false
          const _this = this
          const data = res.data.list
          _this.pages = res.data.pages
          _this.tableData = data
          this.pageSize = res.data.pageSize
          _this.pageNum = res.data.pageNum
          _this.total = res.data.total
        } else if (res.code !== '200') {
          this.loading = false
          this.$message.error('数据请求错误！')
        }
      })
    },
    // 加载账户下拉列表数据
    loadAccNmList() {
      this.$api.common.getAccName().then((res) => {
        this.accNmList = res.data
      })
    },
    // 获取模型方案
    getModel(indexPlanIdList) {
      this.indexPlanIdList = indexPlanIdList
    },
    // 加载方案名称下拉列表数据
    loadPlanNmList(accCdList) {
      this.accCdList = accCdList
      this.$api.indexPlanList.queryPlanNmList({ accCdList: this.accCdList }).then((res) => {
        this.planNmList = res.data
        this.$refs.modelPlanRef.reset()
      })
    },
    // 重置按钮
    resetForm() {
      this.$refs.marketResearchRef.reset()
      this.$refs.modelPlanRef.reset()
    },
    // 删除
    delData(row) {
      const indexPlanId = row.indexPlanId
      this.$confirm('是否要删除 ？', '提示', { closeOnClickModal: false }).then(() => {
        this.$api.indexPlanList.deleteIndexPlan(indexPlanId).then(() => {
          this.$message.success('模型方案删除成功')
          this.$refs.modelPlanRef.reset()
          // 重新查询
          this.loadTableData()
          this.loadPlanNmList()
        })
      })
    },
    // 分页
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.loadTableData()
    },
    // 修改
    modify(row) {
      this.$api.indexPlanList.modifyData(row.indexPlanId).then((res) => {
        if (res.code === '200') {
          const indexPlanId = row.indexPlanId
          this.$router.push({
            path: 'newSchemeList',
            query: {
              id: indexPlanId,
              module: 'modify'
            }
          })
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    // 复制指数方案
    copyIndexPlan(row) {
      this.$router.push({
        path: 'newSchemeList',
        query: {
          id: row.indexPlanId,
          module: 'copy'
        }
      })
    },
    // 查看指数方案
    viewIndexPlan(row) {
      const indexPlanId = row.indexPlanId
      this.$router.push({
        path: 'newSchemeList',
        query: {
          id: indexPlanId,
          module: 'view'
        }
      })
    },
    // 新增指数方案
    newIndexPlan() {
      this.$router.push({
        path: 'newSchemeList',
        query: {
          module: 'add'
        }
      })
    },
    // 获取当前页
    handleCurrentChange(pageNum) {
      this.loadTableData()
    },
    // 选择账户之后的联动操作
    selectAcc(accCdList) {
      this.accCdList = accCdList
      this.loadPlanNmList(this.accCdList)
    }
  }
}
</script>
