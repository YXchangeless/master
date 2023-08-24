<template>
  <div class="modelParameter">
    <template>
      <!-- rp form -->
      <el-form
        v-if="modelCd === 'RP'"
        ref="rpModelParameter"
        :inline="true"
        :disabled="disabled"
        :model="form.rpModelInfo"
        class="demo-form-inline"
        :rules="rpModelParameter"
      >
        <!--rp 时间段-->
        <el-row>
          <el-col v-if="modelCd === 'RP'" :span="24">
            <el-form-item label="时间段 ：" label-width="237px" prop="startDt">
              <el-date-picker
                v-model="form.rpModelInfo.startDt"
                type="date"
                style="width:200px"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="至" class="el-form-item__margin" prop="endDt">
              <el-date-picker
                v-model="form.rpModelInfo.endDt"
                type="date"
                style="width:200px"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!--    end 时间段    -->
        <!--   rp 调仓频率  -->
        <el-row>
          <el-col v-if="modelCd === 'RP'" :span="24">
            <el-form-item label="调仓频率 ：" label-width="237px" prop="transPosFreq">
              <kyInputNumber
                v-model="form.rpModelInfo.transPosFreq"
                style="width:200px"
                :precision="0"
                :max="Infinity"
              ></kyInputNumber>
              <span class="numSpan">月</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!--   end 调仓频率  -->
        <!--   rp 战略资产配置使用历史数据长度  -->
        <el-row>
          <el-col v-if="modelCd === 'RP'" :span="24">
            <el-form-item label="战略资产配置使用历史数据长度 ：" label-width="237px" prop="dataLenSaa">
              <kyInputNumber
                v-model="form.rpModelInfo.dataLenSaa"
                style="width:200px"
                :precision="0"
                :max="Infinity"
              ></kyInputNumber>
              <span class="numSpan">月</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!--   end 战略资产配置使用历史数据长度  -->
        <!--   rp 战术资产配置使用历史数据长度  -->
        <el-row>
          <el-col v-if="modelCd === 'RP'" :span="24">
            <el-form-item label="战术资产配置使用历史数据长度 ：" label-width="237px" prop="dataLenTaa">
              <kyInputNumber
                v-model="form.rpModelInfo.dataLenTaa"
                style="width:200px"
                :precision="0"
                :max="Infinity"
              ></kyInputNumber>
              <span class="numSpan">月</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!--   end rp战术资产配置使用历史数据长度 -->
      </el-form>
      <!-- end rp form -->
      <!-- rp 资产固定权重 -->
      <el-form v-if="modelCd === 'RP'" :model="form.rpModelInfo">
        <el-row>
          <el-col :span="24">
            <el-form-item label="资产固定权重 ：" label-width="237px">
              <FixedWeight
                ref="modelConfRpWeightList"
                :disabled="disabled"
                :rp-options="rpOptions"
                :is-asset-type-equal="form.isAssetTypeEqual"
                :curr-operation="currOperation"
                :model-plan-index-list="modelPlanIndexList"
                :model-conf-rp-weight-list.sync="form.rpModelInfo.modelConfRpWeightList"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- end rp资产均衡权重 -->
      <el-form
        ref="modelParameter"
        class="conditionFilter"
        :disabled="disabled"
        hide-required-asterisk
        :model="form.blModelInfo"
        :rules="modelParameter"
      >
        <!-- 优化目标 -->
        <el-row>
          <el-col v-if="modelCd === 'BL'" :span="24">
            <el-form-item label="优化目标 ：" label-width="237px" prop="optObjTp">
              <el-select
                v-model="form.blModelInfo.optObjTp"
                filterable
                clearable
                placeholder="请选择"
                @change="optTarget"
              >
                <el-option
                  v-for="item in optionData.optObjTpList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item class="el-form-item__margin" prop="optObjItem" label-width="40px">
              <el-select v-model="form.blModelInfo.optObjItem" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in optionOptObjItemList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="form.blModelInfo.optObjTp === 'constraint'"
              prop="optObjVal"
              label=""
              class="el-form-item__margin"
            >
              <kyInputNumber
                v-model="form.blModelInfo.optObjVal"
                style="width:129px;"
                :precision="2"
              ></kyInputNumber>
              <span class="numSpan">%</span>
            </el-form-item>
          </el-col>
          <!--  回测样本区间  -->
          <el-col v-if="modelCd === 'BL'" :span="24">
            <el-form-item label="回测样本区间 ：" label-width="237px" prop="startDt">
              <el-date-picker
                v-model="form.blModelInfo.startDt"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                :disabled="disabled"
              />
            </el-form-item>
            <span style="color: #000;margin-left: 24px">至</span>
            <el-form-item class="el-form-item__margin" prop="endDt">
              <el-date-picker
                v-model="form.blModelInfo.endDt"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                :disabled="disabled"
              />
            </el-form-item>
          </el-col>
          <!--  end 回测样本区间  -->
          <!--  数据频率  -->
          <el-col v-if="modelCd === 'BL'" :span="24">
            <el-form-item label="数据频率 ：" label-width="237px" prop="dataFreq">
              <el-select v-model="form.blModelInfo.dataFreq" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in optionData.dataFreqList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="调仓频率 ：" label-width="90px" class="el-form-item__margin" prop="transPosFreq">
              <kyInputNumber
                v-model="form.blModelInfo.transPosFreq"
                style="width:168px"
                :precision="0"
                :max="Infinity"
              ></kyInputNumber>
              <span class="numSpan">{{ transPosFreqUnit }}</span>
            </el-form-item>
          </el-col>
          <!--  end 数据频率  -->
          <!--  估计方法  -->
          <el-col v-if="modelCd === 'BL'" :span="24">
            <el-form-item :label="`[${riskIndicNm}]估计方法 ：`" label-width="237px" prop="modelEstTp">
              <el-select v-model="form.blModelInfo.modelEstTp" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in optionData.modelEstTpList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="滚动 ：" label-width="90px" class="el-form-item__margin" prop="modelEstRoll">
              <kyInputNumber
                v-model="form.blModelInfo.modelEstRoll"
                style="width:168px"
                :precision="0"
                :max="Infinity"
              ></kyInputNumber>
              <span class="numSpan">月</span>
            </el-form-item>
          </el-col>
          <!--  end 估计方法  -->
          <!--  收益估算方法  -->
          <el-col v-if="modelCd === 'BL'" :span="24">
            <el-form-item label="收益估算方法 ：" label-width="237px" prop="incomeEstTp">
              <el-select v-model="form.blModelInfo.incomeEstTp" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in optionData.incomeEstTpList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="滚动 ：" label-width="90px" class="el-form-item__margin" prop="incomeEstRoll">
              <!--              <el-input v-model="form.incomeEstRoll" style="width:129px" placeholder="请输入" />-->
              <kyInputNumber
                v-model="form.blModelInfo.incomeEstRoll"
                style="width:168px"
                :precision="0"
                :max="Infinity"
              ></kyInputNumber>
              <span class="numSpan">月</span>
            </el-form-item>
          </el-col>
          <!--  end 收益估算方法  -->
          <!--  现金流  -->
          <el-col v-if="modelCd === 'BL'" :span="24">
            <el-form-item label="现金流 ：" label-width="237px">
              <el-input v-model="form.blModelInfo.cashFlow" style="width:220px" disabled placeholder="请输入" />
            </el-form-item>
            <el-form-item label="杠杆 ：" prop="leverage" label-width="90px" class="el-form-item__margin">
              <kyInputNumber
                v-model="form.blModelInfo.leverage"
                style="width:168px"
                :max="Infinity"
              ></kyInputNumber>
            </el-form-item>
          </el-col>
          <!--  end 现金流  -->
          <!--  风险厌恶系数  -->
          <el-col v-if="modelCd === 'BL'" :span="24">
            <el-form-item label="风险厌恶系数	：" prop="riskHateRate" label-width="237px">
              <kyInputNumber
                v-model="form.blModelInfo.riskHateRate"
                style="width:220px"
                :precision="0"
                :min="1"
                :max="5"
              ></kyInputNumber>
            </el-form-item>
          </el-col>
          <!--  end 风险厌恶系数  -->
        </el-row>
      </el-form>
      <!-- 资产均衡权重 -->
      <el-form>
        <el-row>
          <el-col v-if="modelCd === 'BL'" :span="24">
            <el-form-item label="资产均衡权重	：" label-width="237px">
              <TableTwo
                v-if="modelCd === 'BL'"
                ref="modelConfBlWeightList"
                :disabled="disabled"
                :is-asset-type-equal="form.isAssetTypeEqual"
                :curr-operation="currOperation"
                :model-plan-index-list="modelPlanIndexList"
                :model-conf-bl-weight-list.sync="form.blModelInfo.modelConfBlWeightList"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 资产均衡权重 -->
      <!-- 观点矩阵 -->
      <el-form>
        <el-row>
          <el-col v-if="modelCd === 'BL'" :span="24">
            <el-form-item label="观点矩阵	：" label-width="237px">
              <Tablesix
                v-if="modelCd === 'BL'"
                ref="modelConfBlOpinion"
                :disabled="disabled"
                :is-asset-type-equal="form.isAssetTypeEqual"
                :symbol-list="optionData.opinionRelatSymList"
                :curr-operation="currOperation"
                :model-plan-index-list="modelPlanIndexList"
                :model-conf-bl-opinion.sync="form.blModelInfo.modelConfBlOpinion"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- end 观点矩阵 -->
      <OptConst
        ref="optConstTp"
        :disabled="disabled"
        @setModelConfSingle="setModelConfSingle"
        @setMultiTable="setMultiTable"
        :curr-operation="currOperation"
        :is-asset-type-equal="form.isAssetTypeEqual"
        :model-plan-index-list="modelPlanIndexList"
        :opt-const-tp-list="optionData.optConstTpList"
        :opt-const-tp.sync="form.optConstTp"
        :model-conf-single-list.sync="form.modelConfSingleList"
        :model-conf-multi.sync="form.modelConfMulti"
        :opt-const-sym-list="optionData.multiConstSymList"
      />
      <!-- 优化约束条件 end -->
    </template>
  </div>
</template>

<script>
import TableTwo from '@/components/table/TableTwo.vue'
import FixedWeight from '@/components/table/FixedWeight.vue'
import TableSix from '@/components/table/TableSix.vue'

import CurrOperationMixin from '@/views/modelConfig/newList/mixin/CurrOperationMixin'
import DisabledMixin from '@/views/modelConfig/newList/mixin/DisabledMixin'
import OptConst from '@/views/modelConfig/newList/modelingParameter/components/OptConst'

export default {
  name: 'ModelingParameter',
  components: {
    TableTwo: TableTwo,
    Tablesix: TableSix,
    OptConst,
    FixedWeight
  },
  mixins: [CurrOperationMixin, DisabledMixin],
  props: {
    // 模型id
    modelCd: {
      type: String,
      default: '',
      required: true
    },
    // 风险指标，用于估计方法的显示
    riskIndicNm: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      // 备份模型cd
      modelCdCopy: '',
      // RP 模型
      rpForm: {
        // rp 开始时间
        startDt: '',
        // rp 结束时间
        endDt: '',
        // rp 调仓频率
        transPosFreq: undefined,
        // rp 战略资产配置使用历史数据长度
        dataLenSaa: undefined,
        // rp 战术资产配置使用历史数据长度
        dataLenTaa: undefined
      },
      // rp模型校验规则
      rpModelParameter: {
        transPosFreq: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        dataLenSaa: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        dataLenTaa: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        startDt: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        endDt: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        fixedWeight: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      // 模型参数校验规则
      modelParameter: {
        optObjTp: [
          { required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        optObjItem: [
          { required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        optObjVal: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        startDt: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        endDt: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        dataFreq: [
          { required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        // 调仓频率
        transPosFreq: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        // 模型估计方法
        modelEstTp: [
          { required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        // 模型估计回滚月
        modelEstRoll: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        // 收益估算方法
        incomeEstTp: [
          { required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        // 收益估算回滚月
        incomeEstRoll: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        // 杠杆
        leverage: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        // 风险厌恶系数
        riskHateRate: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      // 操作数据
      optionData: {
        'optObjTpList': [],
        'dataFreqList': [],
        'modelEstTpList': [],
        'incomeEstTpList': [],
        'opinionRelatSymList': [],
        'multiConstSymList': [
          {
            'value': '1',
            'label': '小于'
          },
          {
            'value': '2',
            'label': '小于等于'
          },
          {
            'value': '3',
            'label': '大于'
          },
          {
            'value': '4',
            'label': '大于等于'
          }
        ],
        'optConstTpList': [
          {
            'value': 'single',
            'label': '单资产约束'
          },
          {
            'value': 'multi',
            'label': '多资产约束'
          }
        ],
        'inputTPList': []
      },
      // 模型参数数据
      form: {
        // RP 模型
        rpModelInfo: {
          // rp 开始时间
          startDt: '',
          // rp 结束时间
          endDt: '',
          // rp 调仓频率
          transPosFreq: undefined,
          // rp 战略资产配置使用历史数据长度
          dataLenSaa: undefined,
          // rp 战术资产配置使用历史数据长度
          dataLenTaa: undefined,
          // 固定 权重
          modelConfRpWeightList: []
        },
        // 模型方案编号：传则修改(优化)，不传则新增(保存)
        modelPlanId: '',
        // 账户cd
        accCd: '',
        blModelInfo: {
          // 优化目标类别
          optObjTp: '',
          // 优化目标项
          optObjItem: '',
          // 优化目标值
          optObjVal: undefined,
          // 数据频率
          dataFreq: '',
          // 调仓频率
          transPosFreq: undefined,
          // 回测样本起始日期
          startDt: '',
          // 回测样本结束日期
          endDt: '',
          // 模型估计方法
          modelEstTp: '',
          // 模型估计回滚月
          modelEstRoll: undefined,
          // 收益估算方法
          incomeEstTp: '',
          // 收益估算回滚月
          incomeEstRoll: undefined,
          // 现金流
          cashFlow: '',
          // 杠杆
          leverage: undefined,
          // 风险厌恶系数 1-5
          riskHateRate: undefined,
          // 标量τ
          scalar: 0.05,
          // 单资产约束列表
          // BL模型-均衡权重列表
          modelConfBlWeightList: [],
          // BL模型-观点矩阵
          modelConfBlOpinion: {}
        },
        isAssetTypeEqual: false,
        // 优化约束条件分类（单single/多multi）
        optConstTp: 'multi',
        modelConfSingleList: [],
        // 多资产约束
        modelConfMulti: {
          // header列表 value label inputType
          headerList: [],
          // body列表(元素为Map结构)
          bodyList: []
        }
      },
      // 模型资产列表
      modelPlanIndexList: [],
      // 资产固定权重下拉框数据
      rpOptions: []
    }
  },
  computed: {
    // 优化目标项 下拉列表
    optionOptObjItemList() {
      let optObjItemList = []
      this.optionData.optObjTpList
        .filter(optObjTp => optObjTp.value === this.form.blModelInfo.optObjTp)
        .forEach(optObjTp => {
          optObjItemList = [...optObjTp.children]
        })
      return optObjItemList
    },
    // 调仓频率单位
    transPosFreqUnit() {
      const find = this.optionData.dataFreqList.find(item => item.value === this.form.dataFreq)
      return (find && 'label' in find) ? find.label : ''
    }
  },
  watch: {
    // 检测资产固定权重变化
    'form.rpModelInfo.modelConfRpWeightList': {
      handler(newValue) {
        this.$nextTick(() => {
          let flag = false
          this.form.modelConfSingleList.forEach((item2) => {
            flag = false
            newValue.forEach((item1) => {
              if (item1.indexCd === item2.indexCd) {
                item2.constLower = 0
                item2.constUpper = 0
                flag = true
              }
            })
            if (flag) {
              item2.disabled = true
            } else {
              item2.disabled = false
            }
          })
          this.form.modelConfMulti.headerList.forEach((item2) => {
            flag = false
            newValue.forEach((item1) => {
              if (item1.indexCd === item2.value) {
                flag = true
              }
            })
            if (flag) {
              item2.disabled = true
            } else {
              item2.disabled = false
            }
          })
          this.form.modelConfMulti.bodyList.forEach((item2) => {
            newValue.forEach((item1) => {
              if (Object.keys(item2).includes(item1.indexCd)) {
                item2[item1.indexCd] = 0
              }
            })
          })
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 优化目标发生改变
    optTarget() {
      this.form.blModelInfo.optObjItem = ''
      this.form.blModelInfo.optObjVal = undefined
    },
    // 设置多资产约束
    setMultiTable(indexList) {
      if (indexList) {
        let flag = false
        const headerList = indexList.map(index => {
          flag = false
          this.form.rpModelInfo.modelConfRpWeightList.forEach((item) => {
            if (item.indexCd === index.indexCd) {
              flag = true
            }
          })
          if (flag) {
            return {
              /** 代码 */
              value: index.indexCd,
              /** 标签 */
              label: index.assetNm,
              /** 输入框 */
              inputType: 'text',
              disabled: true
            }
          } else {
            return {
              /** 代码 */
              value: index.indexCd,
              /** 标签 */
              label: index.assetNm,
              /** 输入框 */
              inputType: 'text',
              disabled: false
            }
          }
        })
        headerList.push({
          'value': 'CONST_SYM',
          'label': '条件',
          'inputType': 'select'
        })
        headerList.push({
          'value': 'CONST_PCT',
          'label': '总占比（%）',
          'inputType': 'text'
        })
        this.form.modelConfMulti.headerList = headerList
        const body = {}
        headerList.forEach(header => {
          // body[header.value] = undefined
          body[header.value] = '0'
          return body
        })
        this.form.modelConfMulti.bodyList = [body]
        this.form.modelConfMulti.bodyList.forEach(item => {
          item.CONST_SYM = undefined
          item.CONST_PCT = undefined
        })
      }
    },
    // 设置但资产约束数据
    setModelConfSingle(val) {
      if (val) {
        let flag = true
        this.form.modelConfSingleList = val.map((indexVo) => {
          flag = false
          this.form.rpModelInfo.modelConfRpWeightList.forEach((item) => {
            if (item.indexCd === indexVo.indexCd) {
              flag = true
            }
          })
          if (flag) {
            return {
              indexCd: indexVo.indexCd,
              assetNm: indexVo.assetNm,
              constLower: 0,
              constUpper: 0,
              disabled: true
            }
          } else {
            return {
              indexCd: indexVo.indexCd,
              assetNm: indexVo.assetNm,
              constLower: undefined,
              constUpper: undefined,
              disabled: false
            }
          }
        })
      }
    },
    // 获取现金流
    loadCashFlow() {
      this.$api.modelPlanConf.queryCashFlow(this.form.accCd).then(({ data }) => {
        this.form.blModelInfo.cashFlow = data
      })
    },
    // 模型参数校验
    parameter() {
      return new Promise((resolve, reject) => {
        this.$refs['modelParameter'].validate((valid) => {
          if (valid) {
            resolve()
          } else {
            this.$message.warning('模型参数每一项都不能为空')
            reject('模型参数每一项都不能为空')
          }
        })
      })
    },
    // rp模型参数校验
    rpParameter() {
      return new Promise((resolve, reject) => {
        this.$refs['rpModelParameter'].validate((valid) => {
          if (valid) {
            resolve()
          } else {
            this.$message.warning('模型参数每一项都不能为空')
            reject('模型参数每一项都不能为空')
          }
        })
      })
    },
    // 均衡权重校验
    BlWeight() {
      return new Promise((resolve, reject) => {
        this.$refs['modelConfBlWeightList'].$refs['BlWeightList'].validate((valid) => {
          if (valid) {
            resolve()
          } else {
            this.$message.warning('资产均衡权重每一项都不能为空')
            reject('资产均衡权重每一项都不能为空')
          }
        })
      })
    },
    // 观点矩阵校验
    BlOpinion() {
      return new Promise((resolve, reject) => {
        this.$refs['modelConfBlOpinion'].$refs['BlOpinion'].validate((valid) => {
          if (valid) {
            resolve()
          } else {
            this.$message.warning('观点矩阵每一项都不能为空')
            reject('观点矩阵每一项都不能为空')
          }
        })
      })
    },
    // 固定权重校验
    rpWeightList() {
      return new Promise((resolve, reject) => {
        if (this.form.rpModelInfo.modelConfRpWeightList.length === 1 && !this.form.rpModelInfo.modelConfRpWeightList[0].fixedWeight && !this.form.rpModelInfo.modelConfRpWeightList[0].indexCd) {
          resolve()
        } else {
          this.$refs['modelConfRpWeightList'].$refs['fixedWeight'].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              this.$message.warning('资产固定权重每一项都不能为空')
              reject('资产固定权重每一项都不能为空')
            }
          })
        }
      })
    },
    // 资产约束校验
    optConstTp() {
      return new Promise((resolve, reject) => {
        if (this.$refs['optConstTp'].form.optConstTp === this.optionData.optConstTpList[0].value) {
          this.$refs['optConstTp'].$refs['modelConfSingleList'].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              this.$message.warning('单资产约束每一项都不能为空')
              reject('单资产约束每一项都不能为空')
            }
          })
        } else {
          this.$refs['optConstTp'].$refs['modelConfMulti'].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              this.$message.warning('多资产约束每一项都不能为空')
              reject('多资产约束每一项都不能为空')
            }
          })
        }
      })
    },
    // 获取表单数据
    getForm(val) {
      return new Promise(async(resolve, reject) => {
        if (val) {
          // todo 模型选择 校验
        } else {
          if (this.modelCd === 'RP') {
            await this.rpParameter()
            await this.rpWeightList()
          } else {
            await this.parameter()
            await this.BlWeight()
            await this.BlOpinion()
          }
          await this.optConstTp()
        }
        resolve(this.form)
      })
    },
    // 取消
    handleCancel(form) {
      this.$refs['optConstTp'] && this.$refs['optConstTp'].$refs['modelConfSingleList'] && this.$refs['optConstTp'].$refs['modelConfSingleList'].resetFields()
      this.$refs['optConstTp'] && this.$refs['optConstTp'].$refs['modelConfMulti'] && this.$refs['optConstTp'].$refs['modelConfMulti'].resetFields()
      // if (this.modelCd === 'RP') {
      this.$refs.rpModelParameter && this.$refs.rpModelParameter.resetFields()
      this.$refs['modelConfRpWeightList'] && this.$refs['modelConfRpWeightList'].$refs['fixedWeight'] && this.$refs['modelConfRpWeightList'].$refs['fixedWeight'].resetFields()
      // } else {
      this.$refs.modelParameter && this.$refs.modelParameter.resetFields()
      this.$refs['modelConfBlWeightList'] && this.$refs['modelConfBlWeightList'].$refs['BlWeightList'] && this.$refs['modelConfBlWeightList'].$refs['BlWeightList'].resetFields()
      this.$refs['modelConfBlOpinion'] && this.$refs['modelConfBlOpinion'].$refs['BlOpinion'] && this.$refs['modelConfBlOpinion'].$refs['BlOpinion'].resetFields()
      // }
      if (this.$route.params['operation'] === 'new') {
        // RP 模型
        this.form.rpModelInfo = {
          // rp 开始时间
          startDt: '',
          // rp 结束时间
          endDt: '',
          // rp 调仓频率
          transPosFreq: undefined,
          // rp 战略资产配置使用历史数据长度
          dataLenSaa: undefined,
          // rp 战术资产配置使用历史数据长度
          dataLenTaa: undefined,
          // 固定 权重
          modelConfRpWeightList: []
        }
        this.form.blModelInfo = {
          // 优化目标类别
          optObjTp: '',
          // 优化目标项
          optObjItem: '',
          // 优化目标值
          optObjVal: undefined,
          // 数据频率
          dataFreq: '',
          // 调仓频率
          transPosFreq: undefined,
          // 回测样本起始日期
          startDt: '',
          // 回测样本结束日期
          endDt: '',
          // 模型估计方法
          modelEstTp: '',
          // 模型估计回滚月
          modelEstRoll: undefined,
          // 收益估算方法
          incomeEstTp: '',
          // 收益估算回滚月
          incomeEstRoll: undefined,
          // 现金流
          cashFlow: '',
          // 杠杆
          leverage: undefined,
          // 风险厌恶系数 1-5
          riskHateRate: undefined,
          // 标量τ
          scalar: 0.05,
          // 单资产约束列表
          // BL模型-均衡权重列表
          modelConfBlWeightList: [],
          // BL模型-观点矩阵
          modelConfBlOpinion: {}
        }
        this.form.isAssetTypeEqual = false
        // 优化约束条件分类（单single/多multi）
        this.form.optConstTp = 'multi'
        this.form.modelConfSingleList = []
        // 多资产约束
        this.form.modelConfMulti = {
          // header列表 value label inputType
          headerList: [],
          // body列表(元素为Map结构)
          bodyList: []
        }
        this.loadCashFlow()
        this.modelPlanIndexList = JSON.parse(JSON.stringify(form.modelPlanIndexList))
      } else if (this.$route.params['operation'] === 'copy' || this.$route.params['operation'] === 'edit') {
        this.handleForm(form)
      }
    },
    // 处理form表单
    handleForm(form) {
      this.rpOptions = JSON.parse(JSON.stringify(form.modelPlanIndexList))
      for (const formKey in this.form) {
        // 对方存在的才赋值
        if (formKey in form) {
          this.form[formKey] = form[formKey]
        }
      }
      if (!form.isAssetTypeEqual || this.modelPlanIndexList.length === 0 || this.modelCdCopy !== this.modelCd) {
        this.modelPlanIndexList = JSON.parse(JSON.stringify(form.modelPlanIndexList))
      }
      this.modelCdCopy = this.modelCd
      // to do 如果是相同账户可以不调接口
      if (this.$route.params['operation'] !== 'view') {
        this.loadCashFlow()
      }
    },
    // 设置表单数据
    setForm(form, val) {
      if (!this.modelCd) {
        this.modelCdCopy = this.modelCd
      }
      if (!form.isAssetTypeEqual) {
        this.$refs['modelConfBlWeightList'] && this.$refs['modelConfBlWeightList'].$refs['BlWeightList'] && this.$refs['modelConfBlWeightList'].$refs['BlWeightList'].resetFields()
        this.$refs['modelConfBlOpinion'] && this.$refs['modelConfBlOpinion'].$refs['BlOpinion'] && this.$refs['modelConfBlOpinion'].$refs['BlOpinion'].resetFields()
      }
      if (!form.isAssetTypeEqual || this.modelCdCopy !== this.modelCd) {
        this.$refs['optConstTp'] && this.$refs['optConstTp'].$refs['modelConfSingleList'] && this.$refs['optConstTp'].$refs['modelConfSingleList'].resetFields()
        this.$refs['optConstTp'] && this.$refs['optConstTp'].$refs['modelConfMulti'] && this.$refs['optConstTp'].$refs['modelConfMulti'].resetFields()
      }
      // 只取需要的字段
      // 处理现金流
      if (this.optionData.optObjTpList.length === 0) {
        Promise.all([new Promise((resolve, reject) => {
          // 所有模型参数下拉框数据
          this.$api.modelPlanConf.queryModelPlanConfDropdown().then((res) => {
            this.optionData = res.data
            resolve()
          })
        })]).then(() => {
          this.handleForm(form)
        })
      } else {
        this.handleForm(form)
      }
    }
  }
}
</script>
<style lang="scss">
.modelParameter {
  padding-top: 35px;

  .el-form-item.is-required .el-form-item__label:before {
    content: ""
  }

  .conditionFilter {
    .el-form-item {
      display: inline-block;
    }

    .el-form-item__margin {
      margin-left: 20px
    }
  }
}
</style>

<style scoped lang="scss">
.modelParameter {
  padding-top: 35px;
}

.numSpan {
  color: #606266;
  display: inline-block;
  margin-left: 10px;
}

.demonstration {
  font-size: 14px;
  width: 135px;
  display: inline-block;
  text-align: right;
  vertical-align: middle;
  color: #606266;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-weight: 700;
}

.methodBox {
  margin-top: 20px;
}

.more .el-button {
  padding: 0px;
}

.box {
  float: left;
}

.area {
  clear: both;
}
</style>

