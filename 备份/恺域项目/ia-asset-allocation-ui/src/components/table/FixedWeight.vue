<template>
  <div class="fixedWeight">
    <div class="table" style="width: 70%">
      <el-form ref="fixedWeight" :show-message="false" :model="form">
        <el-table
          :data="form.tableData"
        >
          <template slot="empty" style="border:1px solid #000">
            <img src="../../assets/Images/nodata.png" alt="">
          </template>
          <el-table-column prop="indexNm" label="资产大类" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.'+scope.$index + '.indexCd'" :rules="rules.indexCd">
                <el-select v-model="scope.row.indexCd" placeholder="请选择资产大类" :disabled="disabled"
                           @change="rpIndexChange(scope.row.indexCd)"
                >
                  <el-option
                    v-for="item in rpOptions"
                    :key="item['indexCd']"
                    :label="item['assetNm']"
                    :value="item['indexCd']"
                    :disabled="item.disabled"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="fixedWeight"
            label="资产权重（%）"
            width="120px"
          >
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.'+scope.$index + '.fixedWeight'" :rules="rules.fixedWeight">
                <kyInputNumber
                  v-model="scope.row.fixedWeight"
                  style="width:100%"
                  :disabled="disabled"
                ></kyInputNumber>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column v-if="!disabled" label="操作" width="120px">
            <template slot-scope="scope">
              <span class="handleColor">
                <span class="del" v-show="isEmpty" @click="empty()">
                  清空
                </span>
                <span
                  v-show="isDelete"
                  class="del"
                  @click="handleDelOpinion(scope.$index)"
                >删除</span>
                <span
                  v-if="scope.$index === form.tableData.length - 1"
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
import DisabledMixin from '@/views/modelConfig/newList/mixin/DisabledMixin'
import ModelPlanIndexMixin from '@/views/modelConfig/newList/mixin/ModelPlanIndexMixin'

export default {
  name: 'FixedWeight',
  mixins: [DisabledMixin, ModelPlanIndexMixin],
  props: {
    /** 模型配置-bl模型-均衡权重列表 */
    modelConfRpWeightList: {
      type: Array,
      default: () => {
        return []
      },
      required: false
    },
    // 第一次选中的指数资产是否改变
    isAssetTypeEqual: {
      type: Boolean,
      default: false
    },
    // 下拉框数据
    rpOptions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 是否为空
      isEmpty: true,
      // 是否删除
      isDelete: false,
      // 规则
      rules: {
        fixedWeight: [{ required: true, message: '请输入', trigger: 'blur' }],
        indexCd: [{ required: true, message: '请输入', trigger: ['change', 'blur'] }]
      },
      // 总计的颜色
      totalColor: '#fd5757',
      // 表格数据
      form: {
        tableData: [
          {}
        ]
      }
    }
  },
  watch: {
    /** 监控绑定数据，用于回显 */
    modelConfRpWeightList: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.form.tableData = [...newVal]
        if (this.form.tableData.length === 0) {
          this.form.tableData = [{
            indexCd: '',
            assetNm: '',
            fixedWeight: undefined
          }]
          this.handleChangeWeight()
        }
        this.rpIndexChange()
        if (this.form.tableData.length > 1) {
          this.isEmpty = false
          this.isDelete = true
        }
      }
    }
  },
  methods: {
    // 清空
    empty() {
      this.handleChangeWeight()
      this.$refs['fixedWeight'].resetFields()
      this.form.tableData[0].fixedWeight = undefined
      this.form.tableData[0].indexCd = ''
      this.form.tableData[0].assetNm = ''
      // JSON.stringify(this.form.tableData[0])
    },
    // rp下拉框数据改变  assetNm
    rpIndexChange(val) {
      this.rpOptions.forEach((item2) => {
        item2.disabled = false
        this.form.tableData.forEach((item1) => {
          if (item1.indexCd === item2.indexCd) {
            item2.disabled = true
          }
        })
      })
    },
    /** 处理事件-修改权重 */
    handleChangeWeight() {
      this.$emit('update:model-conf-rp-weight-list', this.form.tableData)
    },
    /** 处理事件-新增观点 */
    handleNewOpinion() {
      this.isEmpty = false
      this.isDelete = true
      // todo 新增观点个数限制提示
      if (this.form.tableData.length >= this.rpOptions.length - 1) {
        this.$message.warning('不能新增更多资产')
      } else {
        this.form.tableData.push({
          indexCd: '',
          assetNm: '',
          fixedWeight: undefined
        })
        this.handleChangeWeight()
      }
    },
    /** 处理事件-删除观点 */
    handleDelOpinion(index) {
      // if (this.form.tableData.length === 1) {
      //   this.form.tableData[0].fixedWeight = undefined
      //   this.form.tableData[0].indexCd = ''
      // }
      this.$confirm('是否要删除此资产', '提示').then(() => {
        this.isEmpty = true
        this.isDelete = false
        this.form.tableData.splice(index, 1)
        this.handleChangeWeight()
        this.rpIndexChange()
      })
    },
    /** 模型方案指数 */
    initModePlanIndex(indexList) {
      this.form.tableData = [{
        indexCd: '',
        assetNm: '',
        fixedWeight: undefined
      }]
      this.handleChangeWeight()
    }
  }
}
</script>
<style lang="scss">
.fixedWeight {
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
}
</style>
