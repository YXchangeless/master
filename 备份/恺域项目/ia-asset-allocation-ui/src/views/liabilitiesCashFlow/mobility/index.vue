<template>
  <div class="assets-scroll cashFlowManager">
    <div class="title-bar"><span />流动性管理</div>
    <div>
      <!-- 展示维度 -->
      <el-form class="conditionFilter">
        <el-row>
          <!-- 月度 -->
          <el-col :span="6">
            <el-form-item label="展示维度 ：">
              <el-radio v-model="radio" label="1">月度</el-radio>
            </el-form-item>
          </el-col>
          <!-- end月度 -->
          <!-- 时间段 -->
          <el-col :span="10" class="date">
            <el-form-item label="时间段 ：">
              <el-date-picker
                  v-model="startDate"
                  type="month"
                  style="width:120px"
                  placeholder="选择月"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  :picker-options="pickerOptions"
                  @change="startMonth"
              />
              <span style="color: black;margin:0 5px">至</span>
              <el-date-picker
                  v-model="endDate"
                  type="month"
                  style="width:120px"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  placeholder="选择月"
                  :picker-options="pickerOptions"
                  @change="endMonth"
              />
            </el-form-item>
          </el-col>
          <!-- end 时间段 -->
          <!-- 账户名称 -->
          <el-col :span="8">
            <el-form-item label="账户名称 ：">
              <kySelect
                  ref="marketResearchRef"
                  label="accNm"
                  value="accCd"
                  :v-model="value"
                  :options="nameOptions"
                  @visibleChange="getId"
              ></kySelect>
            </el-form-item>
          </el-col>
          <!-- end账户名称 -->
          <!-- 实际预测复选按钮 -->
          <el-col :span="6">
            <el-form-item label="展示维度 ：">
              <el-checkbox-group
                  v-model="statItemList"
                  :min="1"
                  :max="2"
              >
                <el-checkbox v-for="(city,index) in cities" :key="index+1" :label="index+1">{{
                    city.value
                  }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <!-- end 实际预测复选按钮 -->
          <!-- 查询重置按钮 -->
          <el-col :span="24" class="buttonCenter query">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-col>
          <!-- end 查询重置按钮 -->
        </el-row>
      </el-form>
      <!-- end 展示维度 -->
      <!-- 上传按钮 -->
      <div class="unit">
        <div>单位 ：元</div>
        <el-upload
            class="upload-demo"
            action="http://10.10.3.115:9500/api/asset-allocation-main/cash-flow/upload/v1"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="onSuccess"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
        >
          <el-button size="small" style="height:28px;line-height:0;">点击上传</el-button>
        </el-upload>
      </div>
      <!-- end 上传按钮 -->
      <!-- 表单 -->
      <div class="table">
        <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%;overflow: auto;"
            max-height="530px"
            element-loading-text="加载中"
        >
          <template slot="empty">
            <img src="../../../assets/Images/nodata.png" alt="">
          </template>
          <el-table-column prop="date" label="日期" align="center" />
          <el-table-column
              v-for="item in headerList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
              align="center"
          >
            <el-table-column
                v-for="index in item.children"
                :key="index.code"
                :label="index.name"
                :value="index.code"
                :prop="index.code"
                min-width="130"
                align="center"
            ></el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <!-- end 表单 -->
      <div class="mob_block">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否loading加载
      loading: true,
      // 禁止选择超出当前日期
      pickerOptions: {
        disabledDate(time) {
          const _now = Date.now()
          return time.getTime() > _now
        }
      },
      // 表单
      tableData: [],
      // 月度
      radio: '1',
      // 月
      month: '',
      // 账户绑定值
      value: [],
      // 默认选择当前页
      pageNum: 1,
      // 每页显示10条记录
      pageSize: 10,
      // 总页数
      total: 0,
      // 当前页数
      pages: 1,
      // 账户绑定数组
      nameOptions: [],
      // 开始时间
      startDate: '2020-01',
      // 结束时间
      endDate: '2020-12',
      // 预测
      forecast: true,
      // 实际
      actual: true,
      // 展示维度：1月度、2日度
      showDim: 0,
      // 预测 实际lable
      cities: [{ code: '1', value: '预测' }, { code: '2', value: '实际' }],
      // 预测 实际展示
      statItemList: [1, 2],
      // 账户id
      accCdList: [],
      // 表单头部
      headerList: [],
      // 表单第一行数据
      dr: [],
      // 上传文件
      fileList: [],
      // 文件
      file: {}
    }
  },
  mounted() {
    // 获取账号名称
    this.getName()
    // 默认时间
    this.time()
  },
  methods: {
    // 默认时间
    time() {
      var sdate = new Date()
      this.startDate = sdate.getFullYear() + '-01'
      var edate = new Date()
      var year = edate.getFullYear()
      var month = edate.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      this.endDate = year + '-' + month
    },
    // 获取账号名称
    getName() {
      this.$api.common.getAccName().then((res) => {
        this.nameOptions = res.data
        this.nameOptions.forEach(item => {
          this.accCdList.push(item.accCd)
          // this.value.push(item.accCd)
        })
        this.$nextTick(() => {
          this.$refs.marketResearchRef.setSelectAll()
        })
        // 页面加载所有数据时传ID
        const accCdList = this.accCdList
        this.getList(accCdList)
      })
    },
    // 账号变动时获取Id
    getId(val) {
      this.accCdList = val
    },
    // 获取表单
    getList() {
      this.$api.mobility.mobilityList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        showDim: 1,
        startDate: this.startDate,
        endDate: this.endDate,
        accCdList: this.accCdList,
        statItemList: this.statItemList
      }).then((res) => {
        if (res.code === '200') {
          this.loading = false
          this.headerList = res.data.headerList
          this.tableData = res.data.bodyList.list
          this.pageNum = res.data.bodyList.pageNum // 当前页
          this.pages = res.data.bodyList.pages // 总页数
          this.pageSize = res.data.bodyList.pageSize
          this.total = res.data.bodyList.total
          this.dr = res.data.totalInfo // 表头
          this.tableData.unshift(this.dr)
        } else if (res.code !== '200') {
          this.loading = false
          this.$message.error('请求错误！')
        }
      })
    },
    // 获取开始时间
    startMonth(val) {
    },
    // 获取结束时间
    endMonth(val) {
    },
    // 查询按钮
    onSubmit() {
      this.loading = true
      if (this.startDate === '' || this.endDate === '') {
        this.loading = false
      } else {
        this.$api.mobility.mobilityList({
          pageNum: 1,
          pageSize: 10,
          showDim: 1,
          startDate: this.startDate,
          endDate: this.endDate,
          accCdList: this.accCdList,
          statItemList: this.statItemList
        }).then((res) => {
          if (res.code === '200') {
            this.loading = false
            this.headerList = res.data.headerList
            this.tableData = res.data.bodyList.list
            this.pageNum = res.data.bodyList.pageNum // 当前页
            this.pages = res.data.bodyList.pages // 总页数
            this.pageSize = res.data.bodyList.pageSize
            this.total = res.data.bodyList.total
            this.dr = res.data.totalInfo // 表头
            this.tableData.unshift(this.dr)
          } else if (res.code !== '200') {
            this.loading = false
            this.$message.error('请求错误！')
          }
        })
      }
    },
    // 重置
    resetForm() {
      this.forecast = true
      this.actual = true
      this.statItemList = [1, 2]
      this.$refs.marketResearchRef.reset()
      this.$refs.marketResearchRef.setSelectAll()
      this.time()
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
    // 上传
    handleRemove(file, fileList) {
      this.$api.mobility.upLoad(file, fileList).then((res) => {
      })
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
    },
    // 限制上传
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 删除上传
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 上传成功
    onSuccess(response, file, fileList) {
      const loading = this.$loading({
        lock: true,
        text: '文件上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      if (response.code === '200') {
        loading.close()
        this.file = ''
        this.fileList = []
        this.$message.success('导入成功！')
      } else if (response.code === '500') {
        loading.close()
        this.file = ''
        this.fileList = []
        this.$message.error('请上传正确格式的表格！')
      }
    }
  }
}
</script>

<style lang="scss">

.cashFlowManager {
  .date {
    .el-input--suffix {
      .el-input__inner {
        width: 120px
      }
    }
  }

  .el-table--border, .el-table--group {
    border: none;
  }

  .mob_select {
    display: flex;
    margin: 0 0 0 20px;
  }

  .mobility_body {
    width: 97%;
    height: 100%;
    margin: 20px;
    background-color: #fff;
    border: 1px solid #eee;
  }

  .top {
    background-color: #000;
  }
  .boundary {
    height: 1px;
    background: #dbdcdc;
    margin: 20px 20px;
  }

  .mob_select1 {
    display: flex;
    padding: 0 20px;
  }

  .mob_select2 {
    margin-top: 20px;
    display: flex;
    padding: 0 20px;
  }
  .mob_block {
    width: 100%;
    height: 100px;
  }
  /* end分页 */
  label {
    font-weight: 0;
  }
  .upload-demo {
    float: right;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background: #2a76cd;
  }

  .el-checkbox__input.is-disabled + span.el-checkbox__label {
    color: #606266;
  }

  .el-upload-list__item-name {
    display: none;
  }

  .el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none;
  }
}
</style>
