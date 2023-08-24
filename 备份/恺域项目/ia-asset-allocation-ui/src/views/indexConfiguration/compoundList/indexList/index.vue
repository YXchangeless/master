<template>
  <div class="assets-scroll">
    <div class="title-bar"><span />复合指数列表</div>
    <!-- 查询条件 -->
    <el-form class="conditionFilter">
      <el-row>
        <!-- 复合指数名称 -->
        <el-col :span="9">
          <el-form-item label="复合指数名称 ：">
            <kySelect
              ref="compositeRef"
              label="compIndexNm"
              value="compIndexId"
              :options="options"
              @visibleChange="visibleChange"
            ></kySelect>
          </el-form-item>
        </el-col>
        <!-- end 复合指数名称 -->
        <!-- 查询重置 按钮 -->
        <el-col :span="8" class="query">
          <el-button type="primary" class="btnSize" @click="onSubmit">查询</el-button>
          <el-button class="btnSize" @click="resetForm()">重置</el-button>
        </el-col>
        <!-- end 查询重置 按钮 -->
      </el-row>
    </el-form>
    <!-- end 查询条件 -->
    <!-- 新增按钮 -->
    <div class="unit">
      <div></div>
      <el-button class="el-icon-plus" @click="addList">新增</el-button>
    </div>
    <!-- end 新增按钮 -->
    <!-- 表单 -->
    <div class="table table--border">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        max-height="440px"
        fit
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
        <el-table-column
          prop="compIndexNm"
          label="复合指数名称"
          align="center"
          width="250"
        />
        <el-table-column
          prop="benchShow"
          label="基准"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <span class="handleColor">
              <span
                @click="modify(scope.row)"
              >修改</span>
              <span
                class="del"
                @click="del(scope.row.compIndexId)"
              >删除</span>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- end 表单 -->
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
  name: 'Dashboard',
  data() {
    return {
      // 是否loading加载
      loading: true,
      // 表单数据
      tableData: [],
      // 复合指数绑定的数组
      options: [],
      // 默认选择当前页
      pageNum: 1,
      // 每页显示的数量
      pageSize: 10,
      // 总页数
      pages: 0,
      //  当前页的数量
      size: 0,
      // 总记录数
      total: 0,
      // 修改查看时传的ID
      compIndexId: [],
      // 获取复合指数Id
      compIndexIdList: []
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    // 获取数据列表
    this.listDat()
    // 复合指数列表下拉
    this.searchData()
  },
  methods: {
    // 获取复合指数Id
    visibleChange(val) {
      this.compIndexIdList = val
    },
    // 复合指数列表下拉
    searchData() {
      this.$api.list.pullDown({}).then((res) => {
        const data = res.data
        this.options = data
      })
    },
    // 获取数据列表
    listDat() {
      this.$api.list.indexList({
        compIndexIdList: this.compIndexIdList,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((res) => {
        if (res.code === '200') {
          this.loading = false
          const data = res.data.list
          this.tableData = data
          this.pages = res.data.pages
          this.total = res.data.total
        } else if (res.code !== '200') {
          this.loading = false
          this.$message.error('数据请求错误！')
        }
      })
    },
    // 重置
    resetForm() {
      this.$refs.compositeRef.reset()
    },
    // 每页显示的数量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.listDat()
    },
    // 获取当前页
    handleCurrentChange(pageNum) {
      this.listDat()
    },
    // 修改 方法命名一般用动词
    modify(row) {
      const compIndexId = row.compIndexId
      this.$api.list.check(compIndexId).then((res) => {
        this.$router.push({
          path: 'newCompoundList',
          query: {
            id: row.compIndexId
          }
        })
      })
    },
    // 删除
    del(id) {
      this.$confirm('是否要删除', '提示', { closeOnClickModal: false }).then(() => {
        this.$api.list.delData(id).then(() => {
          this.$message.success('模型方案删除成功')
          this.$refs.compositeRef.reset()
          // 重新查询
          this.listDat()
          this.searchData()
        })
      })
    },
    // 添加
    addList() {
      this.$router.push({
        path: 'newCompoundList'
      })
    },
    // 查询列表
    onSubmit() {
      this.loading = true
      this.$api.list.indexList({
        compIndexIdList: this.compIndexIdList,
        pageNum: 1,
        pageSize: 10
      }).then((res) => {
        if (res.code === '200') {
          this.loading = false
          this.pageNum = res.data.pageNum // 当前页
          this.pageSize = res.data.pageSize
          this.tableData = res.data.list
          this.pages = res.data.pages
          this.total = res.data.total
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-tooltip__popper{ max-width:50% }
</style>
