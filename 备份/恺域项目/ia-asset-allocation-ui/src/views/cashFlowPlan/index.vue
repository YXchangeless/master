<template>
  <div class="assets-scroll cashFlowPlan">
    <!-- 顶部 -->
    <div class="title-bar"><span />现金流规划</div>
    <!-- start 查询条件 -->
    <el-form class="conditionFilter">
      <el-row>
        <el-col :span="8">
          <el-form-item label="账户名称 ：">
            <el-select
              v-model="accCd"
              filterable
              clearable
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
        <el-col :span="8">
          <el-form-item label="模型 ：">
            <el-select v-model="modelPlanId" filterable clearable>
              <el-option
                v-for="item in modelPlanNmList"
                :key="item.modelPlanId"
                :label="item.modelPlanNm"
                :value="item.modelPlanId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="持仓日期 ：">
            <el-date-picker
              v-model="holdDate"
              value-format="yyyy-MM-dd"
              type="date"
              :picker-options="pickerOptionsHold"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="到期日期 ：">-->
        <!--            <el-date-picker-->
        <!--              v-model="expireDate"-->
        <!--              value-format="yyyy-MM-dd"-->
        <!--              type="date"-->
        <!--              :picker-options="pickerOptionsExpire"-->
        <!--              placeholder="选择日期"-->
        <!--            />-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <el-col :span="24" style="text-align: center" class="query">
          <el-button type="primary" @click="query">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- end 查询条件-->
    <!--start 预期特征 -->
    <div class="font_black">单位 ：万元</div>
    <div class="table">
      <el-table v-loading="loading" :data="data" :span-method="arraySpanMethod">
        <template slot="empty" style="border:1px solid #000">
          <img src="../../assets/Images/nodata.png" alt="">
        </template>
        <el-table-column prop="accNm" label="账户名称	" align="center" />
        <el-table-column prop="positionScale" label="持仓规模" align="center" />
        <el-table-column prop="newCashFlow" label="新增现金流" align="center" />
        <el-table-column prop="preCashFlow" label="到期现金流" align="center" />
        <el-table-column prop="assetNm" label="大类资产类别" align="center" />
        <el-table-column prop="recomPct" label="模型推荐优化配置（%）" align="center" />
        <el-table-column prop="positionPct" label="持仓权重（%）" align="center" />
        <el-table-column prop="hintMsg" label="调仓建议（根据现有持仓）" align="center" />
        <el-table-column prop="assetConfigSuggest" label="资金配置建议" align="center" />
        <el-table-column prop="accConfigScale" label="按模型优化建议的2021年账户配置规模" align="center" />
      </el-table>
    </div>
    <!--end 预期特征 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否loading加载
      loading: false,
      // 持仓日期
      holdDate: '',
      // 到期日期
      // expireDate: '',
      // 模型id
      modelPlanId: '',
      // 模型lable
      modelPlanNm: '',
      // 预期特征表单
      data: [],
      // 所有账户
      accountOptions: [],
      // 所有模型
      modelPlanNmList: [],
      // 传账户Id
      accCd: '',
      // 禁止选择超出当前日期
      pickerOptionsHold: {
        disabledDate(time) {
          return new Date((new Date().getFullYear() + '-01-01')).getTime() - 3600 * 1000 * 24 >
            time.getTime() || time.getTime() >
            new Date().getTime() - 3600 * 1000 * 24
        }
      }
    }
  },
  created() {
    this.getasset()
  },
  methods: {
    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 3) {
        if (rowIndex === 0) {
          return {
            rowspan: 8,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 预期特征
    getData() {
      this.$api.cashFlowPlan.cashFlowPlan({
        accCd: this.accCd,
        modelPlanId: this.modelPlanId,
        // predictDt: this.expireDate,
        positionDt: this.holdDate
      }).then((res) => {
        if (res.code === '200') {
          const data = res.data
          let arr = []
          data.assetList.forEach((item) => {
            arr.push(Object.assign(item, data))
          })
          arr.forEach((item) => {
            delete item.assetList
          })
          this.data = arr
          this.loading = false
        } else if (res.code !== '200') {
          this.loading = false
          this.$message.error('数据请求错误！')
        }
      })
    },
    // 获取账户名称下拉
    getasset() {
      this.$api.common.getAccName().then((res) => {
        if (res.code === '200') {
          this.accountOptions = res.data
        } else {
          this.$message.error('请求数据有问题')
        }
      })
    },
    selectAcc(accCd) {
      this.accCd = accCd
      this.modelPlanId = ''
      this.loadModelPlanNmList([this.accCd])
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
          }
        } else {
          this.$message.error('请求数据有问题')
        }
      })
    },
    // 字典查询
    query() {
      if (!this.accCd) {
        return this.$message.warning('请选择账户名称')
      }
      if (!this.modelPlanId) {
        return this.$message.warning('请选择模型')
      }
      if (!this.holdDate) {
        return this.$message.warning('请选择持仓日期')
      }
      // if (!this.expireDate) {
      //   return this.$message.warning('请选择到期日期')
      // }
      this.loading = true
      this.getData()
    },
    // 重置
    reset() {
      this.accCd = ''
      this.modelPlanId = ''
      this.holdDate = ''
      // this.expireDate = ''
    }
  }
}
</script>
<style scoped>
.font_black {
    height: 14px;
    font-size: 14px;
    font-weight: 400;
    color: #4b556a;
    margin: 18px 0px 18px 0px;
}
</style>
<style lang="scss">
.cashFlowPlan {
}
</style>
