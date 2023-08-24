<template>
  <div class="assets-scroll rebalance">
    <!-- 顶部 -->
    <div class="title-bar"><span />再平衡</div>
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
          <el-form-item label="再平衡日历 ：">
            <el-date-picker
              v-model="rebalanceDt"
              value-format="yyyy-MM"
              type="month"
              :picker-options="pickerOptionsHold"
              placeholder="选择月度"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align: center" class="query">
          <el-button type="primary" @click="query">测算</el-button>
          <el-button @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- end 查询条件-->
    <!--start 预期特征 -->
    <el-form class="resultFrom">
      <el-row>
        <el-form-item label="测算结果总览 ：" style="margin-top:15px">
          <span style="display:inline-block;width:150px;color: #606266;"> 时间 ：{{ calculateDate }} </span>
          <span style="display:inline-block;width:200px;font-weight: bold;color: #606266;">现金流 ：<span
            style="font-weight: bold;color:#fd5757"
          >{{ cashFlow }}</span></span>
        </el-form-item>
        <div class="table">
          <el-table v-loading="loading" :data="calculateResultList">
            <template slot="empty" style="border:1px solid #000">
              <img src="../../assets/Images/nodata.png" alt="">
            </template>
            <el-table-column prop="assetNm" label="资产分类" align="center" />
            <el-table-column prop="recomPct" label="推荐权重（%）" align="center" />
            <el-table-column prop="positionPct" label="真实权重（%）" align="center" />
            <el-table-column prop="assetDevi" label="当前比例偏离（%）" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.assetDevi>0" style="color:#fd5757">{{ scope.row.assetDevi }}</span>
                <span v-else-if="scope.row.assetDevi<0" style="color:#67C23A">{{ scope.row.assetDevi }}</span>
                <span v-else>{{ scope.row.assetDevi }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="assetDeviCritical" label="比例偏离阀值（%）" align="center" />
            <el-table-column prop="indexNm" label="基准指数" align="center" />
            <el-table-column prop="indexDevi" label="指数偏离度（%）" align="center" />
            <el-table-column prop="indexDeviCritical" label="指数偏离阀值（%）" align="center" />
          </el-table>
        </div>
      </el-row>
      <el-row>
        <el-form-item label="需要再平衡资产 ：" style="margin-top:15px">
        </el-form-item>
        <div class="table">
          <el-table v-loading="loading" :data="needRebalanceList">
            <template slot="empty" style="border:1px solid #000">
              <img src="../../assets/Images/nodata.png" alt="">
            </template>
            <el-table-column prop="assetNm" label="资产分类" align="center" />
            <el-table-column prop="recomPct" label="推荐权重（%）" align="center" />
            <el-table-column prop="positionPct" label="真实权重（%）" align="center" />
            <el-table-column prop="assetDevi" label="当前比例偏离（%）" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.assetDevi>0" style="color:#fd5757">{{ scope.row.assetDevi }}</span>
                <span v-else-if="scope.row.assetDevi<0" style="color:#67C23A">{{ scope.row.assetDevi }}</span>
                <span v-else>{{ scope.row.assetDevi }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="assetDeviCritical" label="比例偏离阀值（%）" align="center" />
            <el-table-column prop="indexNm" label="基准指数" align="center" />
            <el-table-column prop="indexDevi" label="指数偏离度（%）" align="center" />
            <el-table-column prop="indexDeviCritical" label="指数偏离阀值（%）" align="center" />
          </el-table>
        </div>
      </el-row>
      <el-row>
        <el-form-item label="再平衡 ：" style="margin-top:15px">
        </el-form-item>
        <div class="table">
          <el-table v-loading="loading" :data="rebalanceSuggestList" style="width:300px">
            <template slot="empty" style="border:1px solid #000">
              <img src="../../assets/Images/nodata.png" alt="" style="width:100%">
            </template>
            <el-table-column prop="assetNm" label="资产分类" align="center" />
            <el-table-column prop="assetConfigSuggest" label="资金配置建议（万元）" align="center" />
          </el-table>
        </div>
      </el-row>
    </el-form>
    <!--end 预期特征 -->
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      // 是否loading加载
      loading: false,
      // 现金流
      cashFlow: '',
      // 持仓时间
      calculateDate: '',
      // 到期日期
      rebalanceDt: '',
      // 模型id
      modelPlanId: '',
      // 模型lable
      modelPlanNm: '',
      // 预期特征表单
      data: [],
      // 是否第一次
      first: true,
      // 所有账户
      accountOptions: [],
      // 所有模型
      modelPlanNmList: [],
      // 传账户Id
      accCd: '',
      // 测算结果
      calculateResultList: [],
      // 需要在平衡资产
      needRebalanceList: [],
      // 在平衡
      rebalanceSuggestList: [],
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
    this.rebalanceDt = moment(new Date()).subtract(1, 'days').format('YYYY-MM')
    this.getasset()
  },
  methods: {
    // 预期特征
    getData() {
      this.$api.rebalance.rebalance({
        accCd: this.accCd,
        modelPlanId: this.modelPlanId,
        rebalanceDt: this.rebalanceDt
      }).then((res) => {
        if (res.code === '200') {
          this.calculateDate = res.data.calculateDt
          this.cashFlow = res.data.cashFlow + '万'
          this.calculateResultList = res.data.calculateResultList
          this.needRebalanceList = res.data.needRebalanceList
          this.rebalanceSuggestList = res.data.rebalanceSuggestList
          this.loading = false
        } else if (res.code !== '200') {
          this.loading = false
          this.calculateDate = ''
          this.cashFlow = ''
          this.$message.error('数据请求错误！')
        }
      }).catch(() => {
        this.calculateDate = ''
        this.cashFlow = ''
        this.calculateResultList = []
        this.needRebalanceList = []
        this.rebalanceSuggestList = []
        this.loading = false
      })
    },
    // 获取账户名称下拉
    getasset() {
      this.$api.common.getAccName().then((res) => {
        if (res.code === '200') {
          this.accountOptions = res.data
          this.accCd = this.accountOptions[0].accCd
          this.loadModelPlanNmList([this.accCd])
        } else {
          this.$message.error('请求数据有问题')
        }
      })
    },
    // 账户名称改变
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
            this.modelPlanId = this.modelPlanNmList[0].modelPlanId
            if (this.first) {
              this.query()
              this.first = false
            }
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
      if (!this.rebalanceDt) {
        return this.$message.warning('请选择再平衡日期')
      }
      this.loading = true
      this.getData()
    },
    // 重置
    reset() {
      this.rebalanceDt = moment(new Date()).subtract(1, 'days').format('YYYY-MM')
      this.getasset()
    }
  }
}
</script>
