<template>
  <div class="assets-scroll simulation">
    <!-- 顶部 -->
    <div class="title-bar"><span />情景模拟</div>
    <!-- start 查询条件 -->
    <el-form class="conditionFilter">
      <el-row>
        <el-col :span="8">
          <el-form-item label="账号">
            <el-select
              v-model="accCdData"
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
          <el-form-item label="模型方案">
            <el-select v-model="modelCd" filterable clearable>
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
          <el-form-item label="日期">
            <el-date-picker
              v-model="queryDate"
              value-format="yyyyMMdd"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align: center" class="query">
          <el-button type="primary" @click="TheDictionaryQuery">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- end 查询条件-->
    <!--start 预期特征 -->
    <div class="font_black">预期特征(单位 ：元 | %) :</div>
    <div class="table">
      <el-table v-loading="loading" :data="expect_tabD" style="width: 100%">
        <el-table-column
          prop="expectedFeature"
          label="预期特征"
          align="center"
        />
        <el-table-column prop="yield" label="收益率" align="center" />
        <el-table-column prop="income" label="收益额" align="center" />
      </el-table>
    </div>
    <!--end 预期特征 -->
    <!--start 敏感性测试 -->
    <div class="font_black">敏感性测试(单位 ：元 | %) :</div>
    <div class="font_black-table table">
      <el-table
        v-loading="loading"
        element-loading-text="加载中"
        :data="tableData1"
        style="width: 100%"
        :span-method="objectSpanMethod"
      >
        <template slot="empty">
          <img src="../../../assets/Images/nodata.png" alt="">
        </template>
        <el-table-column label="" align="center">
          <el-table-column align="center" width="50" label="">
            <template>
              <div>
                <div>权</div>
                <div>益</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="" width="120">
            <template slot-scope="scope">
              <span v-if="scope.$index === 0" class="rate"> {{ rate }} </span>
              <el-form v-else-if="scope.$index > 0 && scope.$index < 5">
                <el-form-item>
                  <span style="float: left"> + </span>
                  <el-input-number
                    v-model="scope.row.li"
                    :controls="false"
                    :min="0.01"
                    :max="100"
                    class="inputNumber"
                  ></el-input-number>
                  <span style="float: right"> % </span>
                </el-form-item>
              </el-form>

              <el-form v-else-if="scope.$index > 5 && scope.$index < 10">
                <el-form-item>
                  <span style="float: left"> - </span>
                  <el-input-number
                    v-model="scope.row.minus"
                    :controls="false"
                    :min="0.01"
                    :max="100"
                    class="inputNumber"
                  ></el-input-number>
                  <span style="float: right"> % </span>
                </el-form-item>
              </el-form>

              <div v-else>{{ scope.row.li }}</div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="投资收益率" align="center">
          <el-table-column align="center" label="收益金额">
            <template slot-scope="scope">
              <el-form v-if="scope.$index === 0">
                <el-input-number
                  v-model="numberValidateForm.interestRate0"
                  :controls="false"
                  :min="0.01"
                  :max="10000"
                ></el-input-number>
                <span class="margin14">BP</span>
              </el-form>
              <div v-else>{{ scope.row.date }}</div>
            </template>
          </el-table-column>
          <el-table-column label="投资收益率" align="center">
            <template slot-scope="scope">
              <el-form v-if="scope.$index === 0">
                <el-input-number
                  v-model="numberValidateForm.interestRate1"
                  :controls="false"
                  :min="0.01"
                  :max="10000"
                ></el-input-number>
                <span class="margin14">BP</span>
              </el-form>
              <div v-else>{{ scope.row.name }}</div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="投资收益率" align="center">
          <el-table-column align="center" label="收益金额">
            <template slot-scope="scope">
              <el-form v-if="scope.$index === 0">
                <el-input-number
                  v-model="numberValidateForm.interestRate2"
                  :controls="false"
                  :min="0.01"
                  :max="10000"
                ></el-input-number>
                <span class="margin14">BP</span>
              </el-form>
              <div v-else>{{ scope.row.province }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="投资收益率">
            <template slot-scope="scope">
              <el-form v-if="scope.$index === 0">
                <el-input-number
                  v-model="numberValidateForm.interestRate3"
                  :controls="false"
                  :min="0.01"
                  :max="10000"
                ></el-input-number>
                <span class="margin14">BP</span>
              </el-form>
              <div v-else>{{ scope.row.city }}</div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="投资收益率" align="center">
          <el-table-column align="center" label="收益金额">
            <template slot-scope="scope">
              <el-form v-if="scope.$index === 0">
                <el-input-number
                  v-model="numberValidateForm.interestRate4"
                  :controls="false"
                  :min="0.01"
                  :max="10000"
                ></el-input-number>
                <span class="margin14">BP</span>
              </el-form>
              <div v-else>{{ scope.row.address }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="投资收益率">
            <template slot-scope="scope">
              <div>{{ scope.row.zip }}</div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="投资收益率" align="center">
          <el-table-column align="center" label="收益金额">
            <template slot-scope="scope">
              <div>{{ scope.row.fiv }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="投资收益率">
            <template slot-scope="scope">
              <div>{{ scope.row.it }}</div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="投资收益率" align="center">
          <el-table-column align="center" label="投资金额">
            <template slot-scope="scope">
              <div>{{ scope.row.cell }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="投资收益率">
            <template slot-scope="scope">
              <div>{{ scope.row.gnder }}</div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <div>
        <!--start 计算  -->
        <el-col :span="24" class="buttonCenter" style="margin-top: 30px">
          <el-button type="primary" @click="changeInterestRate">计算</el-button>
          <el-button @click="goSchemeList">取消</el-button>
        </el-col>
        <!--end 计算  -->
      </div>
    </div>
    <!--end 敏感性测试 -->
    <div class="footer" />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      // 是否loading加载
      loading: true,
      // 账户名称绑定值
      accCdData: '',
      // 模型绑定值
      modelCd: '',
      // 日期
      queryDate: '',
      // 模型id
      modelPlanId: '',
      // 模型lable
      modelPlanNm: '',
      // 预期特征表单
      expect_tabD: [
        {
          expectedFeature: '',
          yield: '',
          income: ''
        },
        {
          expectedFeature: '',
          yield: '',
          income: ''
        }
      ],
      // 所有账户
      accountOptions: [],
      // 所有模型
      modelPlanNmList: [],
      // 利 率
      rate: '利 率',
      // 敏感性测试
      tableData1: [
        {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: '',
          fiv: '',
          it: '',
          cell: '',
          email: '',
          gnder: '',
          li: ''
        },
        {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: '',
          fiv: '',
          it: '',
          cell: '',
          email: '',
          gnder: '',
          li: ''
        },
        {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: '',
          fiv: '',
          it: '',
          cell: '',
          email: '',
          gnder: '',
          li: ''
        },
        {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: '',
          fiv: '',
          it: '',
          cell: '',
          email: '',
          gnder: '',
          li: ''
        },
        {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: '',
          fiv: '',
          it: '',
          cell: '',
          email: '',
          gnder: '',
          li: ''
        },
        {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: '',
          fiv: '',
          it: '',
          cell: '',
          email: '',
          gnder: '',
          li: ''
        },
        {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: '',
          fiv: '',
          it: '',
          cell: '',
          email: '',
          gnder: '',
          minus: ''
        },
        {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: '',
          fiv: '',
          it: '',
          cell: '',
          email: '',
          gnder: '',
          minus: ''
        },
        {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: '',
          fiv: '',
          it: '',
          cell: '',
          email: '',
          gnder: '',
          minus: ''
        },
        {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: '',
          fiv: '',
          it: '',
          cell: '',
          email: '',
          gnder: '',
          minus: ''
        }
      ],
      // 投资收益率
      numberValidateForm: {
        interestRate0: '',
        interestRate1: '',
        interestRate2: '',
        interestRate3: '',
        interestRate4: ''
      },
      // 投资收益率的值
      interestRate: {
        interestRate0: '',
        interestRate1: '',
        interestRate2: '',
        interestRate3: '',
        interestRate4: ''
      },
      // 传账户Id
      accCdList: '',
      // 判断是否传入id
      first: true
    }
  },
  created() {
    this.getAsset()
    this.time()
  },
  methods: {
    // 合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 1) {
          return {
            rowspan: 10,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      if (rowIndex === 0) {
        return {
          rowspan: 1,
          colspan: 2
        }
      }
    },
    // 计算
    changeInterestRate() {
      const interestRate = [
        (this.interestRate.interestRate0 = this.numberValidateForm.interestRate0.toString()),
        (this.interestRate.interestRate1 = this.numberValidateForm.interestRate1.toString()),
        (this.interestRate.interestRate2 = this.numberValidateForm.interestRate2.toString()),
        (this.interestRate.interestRate3 = this.numberValidateForm.interestRate3.toString()),
        (this.interestRate.interestRate4 = this.numberValidateForm.interestRate4.toString())
      ]
      const asset = [
        this.tableData1[1].li,
        this.tableData1[2].li,
        this.tableData1[3].li,
        this.tableData1[4].li,
        this.tableData1[5].li,
        '-' + this.tableData1[6].minus,
        '-' + this.tableData1[7].minus,
        '-' + this.tableData1[8].minus,
        '-' + this.tableData1[9].minus
      ]
      this.$api.simulation.calculateData({
        interestRate: interestRate,
        assetPct: asset,
        accCd: this.accCdData,
        modelPlanId: this.modelCd,
        queryDate: this.queryDate
      }).then((res) => {
        const data = res.data
        const result = data.result
        const asset = data.assetPct
        const interestRate = data.interestRate
        this.tableData1[1].li = asset[0]
        this.tableData1[2].li = asset[1]
        this.tableData1[3].li = asset[2]
        this.tableData1[4].li = asset[3]
        this.tableData1[5].li = asset[4]
        this.tableData1[6].minus = asset[5].slice(1)
        this.tableData1[7].minus = asset[6].slice(1)
        this.tableData1[8].minus = asset[7].slice(1)
        this.tableData1[9].minus = asset[8].slice(1)

        this.numberValidateForm.big0 = interestRate[0]
        this.numberValidateForm.big1 = interestRate[1]
        this.numberValidateForm.big2 = interestRate[2]
        this.numberValidateForm.big3 = interestRate[3]
        this.numberValidateForm.big4 = interestRate[4]

        for (var i = 0; i < result.length; i++) {
          this.tableData1[i + 1].date = result[i][0]
          this.tableData1[i + 1].name = result[i][1]
          this.tableData1[i + 1].province = result[i][2]
          this.tableData1[i + 1].city = result[i][3]
          this.tableData1[i + 1].address = result[i][4]
          this.tableData1[i + 1].zip = result[i][5]
          this.tableData1[i + 1].fiv = result[i][6]
          this.tableData1[i + 1].it = result[i][7]
          this.tableData1[i + 1].cell = result[i][8]
          this.tableData1[i + 1].gnder = result[i][9]
        }
      })
    },
    // 取消
    goSchemeList() {
      this.listBox()
    },
    // 敏感性测试
    listBox() {
      this.$api.simulation.simulation({
        accCd: this.accCdData,
        modelPlanId: this.modelCd,
        queryDate: this.queryDate
      }).then((res) => {
        if (res.code === '200') {
          this.loading = false
        }
        const data = res.data
        const result = data.result
        const asset = data.assetPct
        this.tableData1[1].li = asset[0].slice(1, -1)
        this.tableData1[2].li = asset[1].slice(1, -1)
        this.tableData1[3].li = asset[2].slice(1, -1)
        this.tableData1[4].li = asset[3].slice(1, -1)
        this.tableData1[5].li = asset[4]
        this.tableData1[6].minus = asset[5].slice(1, -1)
        this.tableData1[7].minus = asset[6].slice(1, -1)
        this.tableData1[8].minus = asset[7].slice(1, -1)
        this.tableData1[9].minus = asset[8].slice(1, -1)
        const interestRate = data.interestRate
        this.numberValidateForm.interestRate0 = interestRate[0]
        this.numberValidateForm.interestRate1 = interestRate[1]
        this.numberValidateForm.interestRate2 = interestRate[2]
        this.numberValidateForm.interestRate3 = interestRate[3]
        this.numberValidateForm.interestRate4 = interestRate[4]
        for (var i = 0; i < result.length; i++) {
          this.tableData1[i + 1].date = result[i][0]
          this.tableData1[i + 1].name = result[i][1]
          this.tableData1[i + 1].province = result[i][2]
          this.tableData1[i + 1].city = result[i][3]
          this.tableData1[i + 1].address = result[i][4]
          this.tableData1[i + 1].zip = result[i][5]
          this.tableData1[i + 1].fiv = result[i][6]
          this.tableData1[i + 1].it = result[i][7]
          this.tableData1[i + 1].cell = result[i][8]
          this.tableData1[i + 1].gnder = result[i][9]
        }
      })
    },
    // 预期特征
    expectData() {
      this.$api.simulation.expectedCharacteristics({
        accCd: this.accCdData,
        queryDate: this.queryDate
      }).then((res) => {
        if (res.code === '200') {
          this.loading = false
          const data = res.data
          this.expect_tabD = data
        } else if (res.code !== '200') {
          this.loading = false
          this.$message.error('数据请求错误！')
        }
      })
    },
    // 获取账户名称下拉
    getAsset() {
      this.$api.common.getAccName().then((res) => {
        if (res.code === '200') {
          this.accCdData = res.data[0].accCd
          this.accountOptions = res.data
          this.loadModelPlanNmList([res.data[0].accCd])
        } else {
          this.$message.error('请求数据有问题')
        }
      })
    },
    selectAcc(accCdList) {
      this.accCdList = accCdList
      this.loadModelPlanNmList([this.accCdList])
    },
    // 加载方案名称下拉列表数据 @param accCd 账户代码
    loadModelPlanNmList(accCdList) {
      this.accCdList = accCdList
      this.$api.modelPlanList.queryModelPlanNmList({ accCdList: this.accCdList }).then((res) => {
        if (res.code === '200') {
          if (res.data.length === 0) {
            this.modelCd = ''
            this.modelPlanNmList = ''
          } else {
            this.modelPlanNmList = res.data
            this.modelCd = res.data[0].modelPlanId
          }
          if (this.first) {
            this.listBox()
            this.expectData()
            this.first = false
          }
        } else {
          this.$message.error('请求数据有问题')
        }
      })
    },
    // 字典查询
    TheDictionaryQuery() {
      this.loading = true
      this.listBox()
      this.expectData()
    },
    // 重置
    reset() {
      this.getAsset()
      this.time()
    },
    // 默认时间
    time() {
      this.queryDate = moment(moment().subtract(1, 'days')).format('YYYYMMDD')
    }
  }
}
</script>
<style scoped>
.font_black {
    height: 14px;
    margin: 40px 0px 18px 0px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4b556a;
}

.margin14 {
    float: right;
    margin-right: 0px;
}

.el-row {
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.rate {
    color: #3c4455;
    font-family: PingFang SC;
    font-weight: 600;
    opacity: 0.7;
}
</style>
<style lang="scss">
.simulation {
  height: 1000px;

  .el-select > .el-input {
    display: block;
    height: 32px;
    margin-right: -10px;
  }

  .font_black-table {
    .el-table__row:nth-child(1) {
      td:nth-child(2) {
        .el-input__inner {
          width: 100px;
        }
      }

      td:nth-child(3) {
        .el-input__inner {
          width: 100px;
        }
      }

      td:nth-child(4) {
        .el-input__inner {
          width: 100px;
        }
      }

      td:nth-child(5) {
        .el-input__inner {
          width: 100px;
        }
      }

      td:nth-child(6) {
        .el-input__inner {
          width: 100px;
        }
      }
    }

    .el-input-number--small {
      width: 100px;
    }

    .el-input {
      width: 100px;
    }

    .el-input__inner {
      width: 60px;
    }
  }

  .font_black-table {
    .el-table__row:nth-child(2) td:nth-child(1) > div {
      height: 100px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #3c4455;
      opacity: 0.7;
    }

    .el-table__row {
      td:nth-child(1) {
        background: #f5f7fa;
      }
    }

    .el-table__row:nth-child(2) {
      td:nth-child(2) {
        background: #f5f7fa;

        .el-form {
          .el-input-number--small {
            width: 60px;
          }
        }
      }
    }

    .el-table__row:nth-child(3) {
      td:nth-child(1) {
        background: #f5f7fa;

        .el-form {
          .el-input-number--small {
            width: 60px;
          }
        }
      }
    }

    .el-table__row:nth-child(4) {
      td:nth-child(1) {
        background: #f5f7fa;

        .el-form {
          .el-input-number--small {
            width: 60px;
          }
        }
      }
    }

    .el-table__row:nth-child(5) {
      td:nth-child(1) {
        background: #f5f7fa;

        .el-form {
          .el-input-number--small {
            width: 60px;
          }
        }
      }
    }

    .el-table__row:nth-child(6) {
      td:nth-child(1) {
        background: #f5f7fa;

        .el-form {
          .el-input-number--small {
            width: 60px;
          }
        }
      }
    }

    .el-table__row:nth-child(7) {
      td:nth-child(1) {
        background: #f5f7fa;

        .el-form {
          .el-input-number--small {
            width: 60px;
          }
        }
      }
    }

    .el-table__row:nth-child(8) {
      td:nth-child(1) {
        background: #f5f7fa;

        .el-form {
          .el-input-number--small {
            width: 60px;
          }
        }
      }
    }

    .el-table__row:nth-child(9) {
      td:nth-child(1) {
        background: #f5f7fa;

        .el-form {
          .el-input-number--small {
            width: 60px;
          }
        }
      }
    }

    .el-table__row:nth-child(10) {
      td:nth-child(1) {
        background: #f5f7fa;

        .el-form {
          .el-input-number--small {
            width: 60px;
          }
        }
      }
    }

    .el-table_2_column_4_column_5 .is-center .is-leaf {
      border: 0px !important;
    }
  }

  .table tr th.is-leaf {
    background: #f5f7fa;
  }

  .is-group tr:nth-child(2) th:nth-child(1) {
    border-right: 0px;
  }

  .is-group tr:nth-child(1) th:nth-child(1) {
    border-bottom: 1px #f5f7fa;
  }

  .table tr th {
    font-weight: 600;
    opacity: 0.7;
    background: #f3f4f6;
    -webkit-box-shadow: 0px 1px 0px 0px #dbdcdc;
    box-shadow: 0px 1px 0px 0px #dbdcdc;
    box-sizing: border-box;
  }

  .el-table--group,
  .el-table--border {
    border: 0px;
  }

  .el-table--border th:first-child .cell,
  .el-table--border td:first-child .cell {
    height: 40px;
  }

  .el-table .cell {
    height: 40px;
    text-align: center;
    line-height: 40px;
  }

  .font_black-table
  table
  .el-table__row:nth-child(6)
  td:nth-child(1)
  .el-input--small {
    margin-left: 7px;
  }

  .font_black[data-v-662be8d7] {
    margin: 40px 0px 20px 0px;
  }

  .font_black-table .el-input {
    width: 60px;
  }

  .el-button + .el-button {
    margin-left: 20px;
  }
  .inputNumber{
    margin-top: 4px;
  }
}
</style>
