<template>
  <div class="assets-scroll yieldAnalysis">
    <div class="title-bar"><span/>固收类收益率分析</div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
<!--      <el-tab-pane label="期限分析" name="first">期限分析</el-tab-pane>-->
      <el-tab-pane label="收益率分析" name="second">
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
            <el-col :span="8">
              <el-button type="primary" @click="getTables()">查询</el-button>
              <el-button @click="resetForm()">重置</el-button>
            </el-col>
            <!-- end查询 重置 按钮-->
          </el-row>
        </el-form>
        <el-row style="margin: 10px 0;line-height: 32px">
          <el-col :span="12" style="color:#606266">单位 ：亿元</el-col>
          <el-col :span="12" style="color:#606266;"><el-button style="float:right" @click="downLoad()" icon="el-icon-download">下载</el-button></el-col>
        </el-row>
        <div class="table">
          <el-table
            :data="tableData"
            style="width: 100%"
            max-height="449px"
            fit
            border
            row-key="id"
            lazy
            :tree-props="{children: 'children'}"
          >
            <el-table-column
              prop="assetNm"
              label=""
              width="220">
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
              prop="financialCosts"
              label="财务成本"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="residualMaturity"
              label="剩余期限（年）"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="maturityYield"
              label="到期收益率（成本）"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="floatProfitLoss"
              label="为销售浮动盈亏"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
        <!-- end table -->
      </el-tab-pane>
<!--      <el-tab-pane label="交易对手分析" name="third">交易对手分析</el-tab-pane>-->
<!--      <el-tab-pane label="信用评级分析" name="fourth">信用评级分析</el-tab-pane>-->
<!--      <el-tab-pane label="地区分析" name="fifth">地区分析</el-tab-pane>-->
<!--      <el-tab-pane label="浮息固息分析" name="sixth">浮息固息分析</el-tab-pane>-->
<!--      <el-tab-pane label="敏感性分析" name="seventh">敏感性分析</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',

  data() {
    return {
      // 账户名称数组
      accountOptions: [],
      // 绑定账户名称的值
      account: [],
      // 禁止选择超出当前日期
      pickerOptions: {
        disabledDate(time) {
          const _now = Date.now()
          return time.getTime() > _now
        }
      },
      activeName: 'second',
      options: [],
      // 账户
      value: '',
      // 开始时间
      starDate: '',
      // 表格
      tableData: [{
        id: '',
        assetCd: '',
        assetNm: '合计',
        assetScale: '',
        scalePct: '',
        financialCosts: '',
        residualMaturity: '',
        maturityYield: '',
        floatProfitLoss: '',
        children: []
      }],
      isclick: false
    }
  },

  mounted() {
    this.time()
    this.getAccountName()
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 获取账号名称下拉
    getAccountName() {
      this.$api.common.getAccName().then((res) => {
        this.accountOptions = res.data
        this.accountOptions.forEach((item) => {
          this.account.push(item.accCd)
        })
        this.$nextTick(() => {
          this.$refs.marketResearchRef.setSelectAll()
        })
        this.getTables(this.account)
      })
    },
    // 账号传值
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
    // 获取表格
    getTables() {
      this.$api.yieldAnalysis.getTable({ accCdList: this.account, queryDate: this.starDate }).then((res) => {
        this.tableData[0].id = res.data.id
        this.tableData[0].assetCd = res.data.assetCd
        this.tableData[0].assetNm = res.data.assetNm
        this.tableData[0].assetScale = res.data.assetScale
        this.tableData[0].financialCosts = res.data.financialCosts
        this.tableData[0].floatProfitLoss = res.data.floatProfitLoss
        this.tableData[0].maturityYield = res.data.maturityYield
        this.tableData[0].residualMaturity = res.data.residualMaturity
        this.tableData[0].scalePct = res.data.scalePct
        this.tableData[0].children = res.data.children
        function guid() {
          function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
          }
          return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
        }
        var addId = function(arr) {
          if (typeof arr === 'object' || typeof arr === []) {
            var result = []
            arr.forEach(element => {
              element.id = guid()
              if (element.children) {
                addId(element.children)
              }
              result.push(element)
            })
            return result
          }
          return arr
        }

        console.log(addId(this.tableData))
        // console.log(this.tableData[0].children[0].children[0])
      })
      this.isclick = true
    },
    // 重置
    resetForm() {
      this.getAccountName()
      // this.$refs.marketResearchRef.reset()
      this.time()
    },
    // 下载
    async downLoad() {
      if (this.isclick === false) {
        this.$message.warning('请先做查询')
      } else {
        this.$api.yieldAnalysis.exportTable(
          { accCdList: this.account, queryDate: this.starDate },
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
          '收益率分析.xlsx'
        )
      }
    }
  }
}
</script>

<style lang="scss">
.yieldAnalysis{
  .el-button + .el-button {
    margin-left: 20px;
  }
  .tableHead{
    .el-table th > .cell{
      font-weight: 400;
    }
  }
  .el-table th.gutter{
    display: table-cell!important;
  }

}

</style>
