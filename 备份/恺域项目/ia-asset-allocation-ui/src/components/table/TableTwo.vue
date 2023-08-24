<template>
  <div class="BlWeightList">
    <div class="table" style="width: 50%">
      <el-form ref="BlWeightList" :show-message="false" :model="form">
        <el-table
          :data="form.tableData"
          border
        >
          <template slot="empty" style="border:1px solid #000">
            <img src="../../assets/Images/nodata.png" alt="">
          </template>
          <el-table-column prop="assetNm" label="均衡权重名称" align="center" />
          <el-table-column
            align="center"
          >
            <template slot="header" slot-scope="scope">
              <span>
                均衡权重%（总计：<span :style="{'color':totalColor}">{{ weightTotal }}%</span>）
              </span>
            </template>
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.'+scope.$index + '.balanceWeight'" :rules="rules.balanceWeight">
                <kyInputNumber
                  v-model="scope.row.balanceWeight"
                  style="width:129px"
                  :disabled="disabled"
                ></kyInputNumber>
              </el-form-item>
              <!--            <el-input v-model="scope.row.balanceWeight" type="text" :disabled="disabled" @input="handleChangeWeight"/>-->
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
import NP from 'number-precision'

export default {
  name: 'TableTwo',
  mixins: [DisabledMixin, ModelPlanIndexMixin],
  props: {
    /** 模型配置-bl模型-均衡权重列表 */
    modelConfBlWeightList: {
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
    }
  },
  data() {
    return {
      // 规则
      rules: {
        balanceWeight: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      // 总计的颜色
      totalColor: '#fd5757',
      // 表格数据
      form: {
        tableData: [
          {
          }
        ]
      }
    }
  },
  computed: {
    // 计算总计值
    weightTotal() {
      let total
      total = this.form.tableData.reduce((total, item) => {
        let num = 0
        item.balanceWeight && (num = item.balanceWeight)
        return NP.plus(total, Number(num))
      }, 0)
      if (total === 100) {
        this.totalColor = '#67C23A'
      } else {
        this.totalColor = '#fd5757'
      }
      return total
    }
  },
  watch: {
    /** 监控绑定数据，用于回显 */
    modelConfBlWeightList: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.form.tableData = [...newVal]
      }
    }
  },
  methods: {
    /** 处理事件-修改权重 */
    handleChangeWeight() {
      this.$emit('update:model-conf-bl-weight-list', this.form.tableData)
    },
    /** 模型方案指数 */
    initModePlanIndex(indexList) {
      this.form.tableData = indexList.map(indexVo => {
        return {
          indexCd: indexVo.indexCd,
          assetNm: indexVo.assetNm,
          balanceWeight: undefined
        }
      })
      this.handleChangeWeight()
    }
  }
}
</script>

<style lang="scss">
.BlWeightList {
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
}
</style>
