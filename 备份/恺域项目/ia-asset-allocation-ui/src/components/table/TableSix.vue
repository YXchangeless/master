<template>
  <div class="BlOpinion">
    <div class="table" style="width: 90%">
      <el-form ref="BlOpinion" :show-message="false" :model="formTemp">
        <el-table
          :data="formTemp.tableData"
        >
          <template slot="empty" style="border:1px solid #000">
            <img src="../../assets/Images/nodata.png" alt="">
          </template>
          <el-table-column
            v-for="(item) in formTemp.columnData"
            :key="item.value"
            :column-key="item.value"
            :label="item.label"
            align="center"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableData.'+scope.$index + '.'+item.value"
                :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
              >
                <div v-if="item.inputType === 'text'">
                  <kyInputNumber
                    v-if="item.value==='PAY_BACK'||item.value==='CREDIT_LEVEL'"
                    v-model="scope.row[item.value]"
                    :disabled="disabled"
                    style="width:100%"
                  ></kyInputNumber>
                  <kyInputNumber
                    v-else
                    v-model="scope.row[item.value]"
                    style="width:100%"
                    :disabled="disabled"
                    :max="1"
                    :precision="0"
                    :min="-1"
                  ></kyInputNumber>
                </div>
                <div v-else-if="item.value === 'INDEX_OPINION'">
                  {{ scope.row[item.value] | filterSymbol(symbolList) }}
                </div>
                <div v-else>
                  {{ scope.row[item.value] }}
                </div>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column v-if="!disabled" fixed="right" label="操作" width="120px">
            <template slot-scope="scope">
              <span class="handleColor">
                <span
                  class="del"
                  @click="handleDelOpinion(scope.$index)"
                >删除</span>
                <span
                  v-if="scope.$index === formTemp.tableData.length - 1"
                  key="new"
                  @click="handleNewOpinion()"
                >新增</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
  </div>
</template>
<script>
import CurrOperationMixin from '@/views/modelConfig/newList/mixin/CurrOperationMixin'
import DisabledMixin from '@/views/modelConfig/newList/mixin/DisabledMixin'
import ModelPlanIndexMixin from '@/views/modelConfig/newList/mixin/ModelPlanIndexMixin'

export default {
  name: 'ModelConfBlOpinion',
  filters: {
    // 过滤数据
    filterSymbol(value, symbolList) {
      if (!value || !symbolList) return ''
      const findSymbol = symbolList.find(symbol => symbol.value === value)
      if (findSymbol && findSymbol.label) {
        return findSymbol.label
      } else {
        return value
      }
    }
  },
  mixins: [CurrOperationMixin, DisabledMixin, ModelPlanIndexMixin],
  props: {
    // 观点矩阵数据
    modelConfBlOpinion: {
      type: Object,
      default() {
        return {
          headerList: this.formTemp.columnData,
          bodyList: this.formTemp.tableData
        }
      },
      required: true
    },
    // 第一次选中的指数资产是否改变
    isAssetTypeEqual: {
      type: Boolean,
      default: false
    },
    // 选中数据
    symbolList: {
      type: Array,
      default() {
        return [{
          'value': '0',
          'label': '等于'
        }]
      },
      required: true
    }
  },
  data() {
    return {
      // 规则
      rules: {
        BlOpinion: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      // 观点矩阵表格数据备份
      formTemp: {
        tableData: [],
        columnData: [{
          value: 'INDEX_OPINION',
          label: '观点',
          inputType: 'label'
        },
          {
            value: 'PAY_BACK',
            label: '回报（%）',
            inputType: 'text'
          },
          {
            value: 'CREDIT_LEVEL',
            label: '置信水平（%）',
            inputType: 'text'
          }]
      },
      // 观点矩阵表格数据
      form: {
        headerList: [],
        bodyList: []
      }
    }
  },
  watch: {
    /** 监控绑定数据，用于回显 */
    modelConfBlOpinion: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal && newVal.headerList) {
          this.formTemp.columnData = [...newVal.headerList]
          this.formTemp.tableData = [...newVal.bodyList]
          // todo 观点矩阵，如果有指数，至少一条
        }
      }
    }
  },
  methods: {
    /** 模型方案指数 */
    initModePlanIndex(indexList) {
      const headerList = indexList.map(indexVo => {
        return {
          assetCd: indexVo.assetCd,
          value: indexVo.indexCd,
          label: indexVo.assetNm,
          inputType: 'text'
        }
      })
      const blOption = [
        {
          value: 'INDEX_OPINION',
          label: '观点',
          inputType: 'label'
        },
        {
          value: 'PAY_BACK',
          label: '回报（%）',
          inputType: 'text'
        },
        {
          value: 'CREDIT_LEVEL',
          label: '置信水平（%）',
          inputType: 'text'
        }
      ]
      blOption.forEach(option => headerList.push(option))
      let arr = []
      indexList.forEach((value, index) => {
        const body = {}
        headerList.forEach(header => {
          if (header.value === 'INDEX_OPINION') {
            body[header.value] = '0'
          } else {
            if (header.value === value.indexCd) {
              body[header.value] = '1'
              body['CREDIT_LEVEL'] = '95'
              switch (header.assetCd) {
                case 'CE':
                  body['PAY_BACK'] = '2.23'
                  break
                case 'RN':
                  body['PAY_BACK'] = '3.00'
                  break
                case 'HGCP':
                  body['PAY_BACK'] = '4.00'
                  break
                case 'HYCP':
                  body['PAY_BACK'] = '4.50'
                  break
                case 'DLSF':
                  body['PAY_BACK'] = '9.86'
                  break
                case 'ALSF':
                  body['PAY_BACK'] = '10.92'
                  break
                case 'UE':
                  body['PAY_BACK'] = '5.30'
                  break
              }
            } else {
              if (header.value !== 'CREDIT_LEVEL' && header.value !== 'PAY_BACK') {
                body[header.value] = '0'
              }
            }
          }
        })
        arr.push(body)
      })
      this.formTemp.columnData = headerList
      this.formTemp.tableData = arr
      this.handleChange()
    },
    /** 处理事件-输入 */
    handleChange() {
      this.$emit('update:model-conf-bl-opinion', {
        headerList: this.formTemp.columnData,
        bodyList: this.formTemp.tableData
      })
    },
    /** 处理事件-新增观点 */
    handleNewOpinion() {
      // todo 新增观点个数限制提示
      if (this.formTemp.tableData.length === 20) {
        this.$message.warning('不能新增更多观点')
      } else {
        // 拷贝第一个
        const one = this.formTemp.tableData[0]
        const endOne = Object.assign({}, one)
        // 初始化第属性
        for (const endOneKey of Object.keys(endOne)) {
          if (endOneKey === 'INDEX_OPINION') {
            // 观点默认等于
            endOne[endOneKey] = '0'
          } else {
            endOne[endOneKey] = '0'
          }
        }
        this.formTemp.tableData.push(endOne)
        for (const a in endOne) {
          if (a === 'PAY_BACK') {
            endOne[a] = undefined
          } else if (a === 'CREDIT_LEVEL') {
            endOne[a] = undefined
          }
        }
        this.handleChange()
      }
    },
    /** 处理事件-删除观点 */
    handleDelOpinion(index) {
      if (this.formTemp.tableData.length === 1) {
        return this.$message.warning('至少保留一个观点')
      }
      this.$confirm('是否要删除此观点', '提示').then(() => {
        this.formTemp.tableData.splice(index, 1)
        this.handleChange()
      })
    }
  }
}
</script>
<style lang="scss">
.BlOpinion {
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
}
</style>
