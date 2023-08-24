<template>
  <el-form class="">
    <el-row class="optConstTp">
      <el-col :span="24">
        <el-form-item label="优化约束条件	：" label-width="237px">
          <el-radio-group v-model="form.optConstTp" :disabled="disabled">
            <el-radio
              v-for="item in optConstTpList"
              :key="item.value"
              :label="item.value"
              @change="handleOptConstChange"
            >{{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <!-- 单资产约束 start -->
        <el-form-item label="" label-width="237px">
          <el-form :show-message="false" :model="form" ref="modelConfSingleList">
            <div v-show="form.optConstTp === optConstTpList[0].value" key="single" class="table" style="width: 90%">
              <el-table
                ref="modelConfSingleTable"
                :data="form.modelConfSingleList"
              >
                <el-table-column prop="assetNm" label="资产名称" align="center" />
                <el-table-column prop="constLower" label="约束下限（%）" align="center">
                  <template slot-scope="scope">
                    <el-form-item :prop="'modelConfSingleList.'+scope.$index + '.constLower'" :rules="rules.constLower">
                      <kyInputNumber
                        style="width:100%"
                        :disabled="disabled||scope.row.disabled"
                        :max="100"
                        :min="0"
                        :is-precision="false"
                        v-model="scope.row['constLower']"
                      ></kyInputNumber>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="constUpper" label="约束上限（%）" align="center">
                  <template slot-scope="scope">
                    <el-form-item :prop="'modelConfSingleList.'+scope.$index + '.constUpper'" :rules="rules.constUpper">
                      <kyInputNumber
                        style="width:100%"
                        :disabled="disabled||scope.row.disabled"
                        :max="100"
                        :min="0"
                        :is-precision="false"
                        v-model="scope.row['constUpper']"
                      ></kyInputNumber>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form>
          <el-form :show-message="false" :model="form.modelConfMulti" ref="modelConfMulti">
            <div v-show="form.optConstTp === optConstTpList[1].value" key="multi" style="width: 90%" class="table">
              <el-table
                :data="form.modelConfMulti.bodyList"
              >
                <el-table-column
                  v-for="item in form.modelConfMulti.headerList"
                  :key="item.value + 'multi'"
                  :column-key="item.value + 'multi'"
                  :label="item.label"
                  :prop="item.value"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-form-item
                      v-if="item.value==='CONST_PCT'"
                      :prop="'bodyList.'+scope.$index + '.'+item.value"
                      :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
                    >
                      <kyInputNumber
                        v-model="scope.row[item.value]"
                        :disabled="disabled||item.disabled"
                        style="width:100%"
                      ></kyInputNumber>
                    </el-form-item>
                    <el-form-item
                      v-else-if="item.inputType === 'select'||item.value==='CONST_SYM'"
                      :prop="'bodyList.'+scope.$index + '.'+item.value"
                      :rules="[{ required: true, message: '请输入', trigger: [ 'blur'] }]"
                    >
                      <el-select
                        :key="'select' + item.value"
                        v-model="scope.row[item.value]"
                        :disabled="disabled||item.disabled"
                      >
                        <el-option
                          v-for="(option) in optConstSymList"
                          :key="option.value"
                          :value="option.value"
                          :label="option.label"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      v-else
                      :prop="'bodyList.'+scope.$index + '.'+item.value"
                      :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
                    >
                      <kyInputNumber
                        style="width:100%"
                        :disabled="disabled||item.disabled"
                        :max="1"
                        :min="-1"
                        :precision="0"
                        v-model="scope.row[item.value]"
                      ></kyInputNumber>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column v-if="!disabled" fixed="right" label="操作" width="120px">
                  <template slot-scope="scope">
                  <span class="handleColor">
                    <span
                      class="del"
                      @click="handleDelConstClick(scope.$index)"
                    >删除</span>
                    <span
                      v-if="scope.$index === form.modelConfMulti.bodyList.length - 1"
                      @click="handleNewConstClick()"
                    >新增</span>
                  </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form>
        </el-form-item>
        <!-- 多资产约束 end -->
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import CurrOperationMixin from '@/views/modelConfig/newList/mixin/CurrOperationMixin'
import DisabledMixin from '@/views/modelConfig/newList/mixin/DisabledMixin'
import ModelPlanIndexMixin from '@/views/modelConfig/newList/mixin/ModelPlanIndexMixin'

export default {
  name: 'OptConst',
  mixins: [CurrOperationMixin, DisabledMixin, ModelPlanIndexMixin],
  props: {
    /** 优化约束条件分类（单single/多multi） */
    optConstTp: {
      type: String,
      default: 'multi',
      required: false
    },
    /** 单资产约束列表 */
    modelConfSingleList: {
      type: Array,
      required: true
    },
    /** 多资产约束 */
    modelConfMulti: {
      type: Object,
      default() {
        return {
          headerList: [],
          bodyList: []
        }
      },
      required: true
    },
    // 第一次选中的指数资产是否改变
    isAssetTypeEqual: {
      type: Boolean,
      default: false
    },
    /** 优化约束条件 列表 （单single/多multi） */
    optConstTpList: {
      type: Array,
      default() {
        return [
          {
            value: 'single',
            label: '单资产约束'
          },
          {
            value: 'multi',
            label: '多资产约束'
          }
        ]
      },
      required: false
    },
    /** 符号列表 */
    optConstSymList: {
      type: Array,
      default() {
        return [
          {
            value: '0',
            label: '等于'
          },
          {
            value: '1',
            label: '小于'
          },
          {
            value: '2',
            label: '小于等于'
          },
          {
            value: '3',
            label: '大于'
          },
          {
            value: '4',
            label: '大于等于'
          }
        ]
      },
      required: false
    }
  },
  data() {
    return {
      // 单资产约束校验规则
      rules: {
        constLower: [{ required: true, message: '请输入', trigger: 'blur' }],
        constUpper: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      // 资产约束数据
      form: {
        optConstTp: 'multi',
        modelConfSingleList: [],
        modelConfMulti: {
          headerList: [],
          bodyList: []
        }
      }
    }
  },
  watch: {
    // 获取选中的资产约束
    optConstTp: {
      handler(newVal) {
        this.form.optConstTp = newVal
      }
    },
    // 获取单资产约束数据
    modelConfSingleList: {
      deep: true,
      handler(newVal) {
        this.form.modelConfSingleList = [...newVal]
      }
    },
    // 获取多资产约束数据
    modelConfMulti: {
      deep: true,
      handler(newVal) {
        this.form.modelConfMulti = { ...newVal }
      }
    }
  },
  created() {
  },
  methods: {
    /** 初始化模型方案指数
     * @param indexList 指数列表
     **/
    initModePlanIndex(indexList) {
      if (this.form.optConstTp === this.optConstTpList[0].value) {
        // 单资产约束
        this.initSingleConst(indexList)
      } else if (this.form.optConstTp === this.optConstTpList[1].value) {
        this.initMultiTable(indexList)
      }
    },
    /** 处理事件-优化约束条件单双切换 */
    handleOptConstChange() {
      this.$emit('update:opt-const-tp', this.form.optConstTp)
      // todo 暂时处理成切换则刷新数据
      this.initModePlanIndex(this.modelPlanIndexList)
    },
    /** 处理事件-单资产约束修改 */
    handleSingleChange() {
      this.$emit('update:model-conf-single-list', this.form.modelConfSingleList)
    },
    /** 处理事件-多资产约束修改 */
    handleMultiChange() {
      this.$emit('update:model-conf-multi', this.form.modelConfMulti)
    },
    /** 处理事件-多资产删除约束 */
    handleDelConstClick(index) {
      if (this.form.modelConfMulti.bodyList.length === 1) {
        return this.$message.warning('至少保留一个约束条件')
      }
      this.$confirm('确定要删除此约束', '提示').then(() => {
        if (this.form.modelConfMulti && this.form.modelConfMulti.bodyList) {
          this.form.modelConfMulti.bodyList.splice(index, 1)
          this.$emit('update:model-conf-multi', this.form.modelConfMulti)
        }
      })
    },
    /** 处理事件-多资产新增约束 */
    handleNewConstClick() {
      // 多资产约束 指数个数的2.5倍向上取整，至少5个
      let ceil = Math.ceil(this.modelPlanIndexList && this.modelPlanIndexList.length * 2.5)
      ceil = ceil < 5 ? 5 : ceil
      if (this.form.modelConfMulti.bodyList.length >= ceil) {
        return this.$message.warning('不能增加更多约束条件')
      }
      // 拷贝第一个，初始化默认值，追加到最后位置
      if (this.form.modelConfMulti && this.form.modelConfMulti.bodyList) {
        const bodyList = this.form.modelConfMulti.bodyList
        if (bodyList && bodyList.length > 0) {
          const body = bodyList[0]
          const newOne = JSON.parse(JSON.stringify(body))
          if (newOne) {
            Object.keys(newOne).forEach(prop => {
              newOne[prop] = 0
            })
            bodyList.push(newOne)
            for (const a in newOne) {
              if (a === 'CONST_SYM') {
                newOne[a] = undefined
              } else if (a === 'CONST_PCT') {
                newOne[a] = undefined
              }
            }
          }
        }
      }
    },
    /** 初始化单资产约束 */
    initSingleConst(indexList) {
      this.$emit('setModelConfSingle', indexList)
    },
    /** 初始化多资产约束 */
    initMultiTable(indexList) {
      this.$emit('setMultiTable', indexList)
    }
  }
}
</script>
<style lang="scss">
.optConstTp {
  .el-table {
    .el-form-item--small.el-form-item {
      margin-bottom: 0px;
    }
  }
}
</style>
<style scoped>
.cut > span {
    font-size: 14px;
    font-family: PingFang SC;
    color: #4b556a;
    font-weight: 700;
    width: 135px;
    display: inline-block;
    text-align: right;
    padding: 0px 12px 0 0;
    box-sizing: border-box;
}
</style>
