import CurrOperationMixin from '@/views/modelConfig/newList/mixin/CurrOperationMixin'

export default {
  mixins: [CurrOperationMixin],
  props: {
    /** 模型指数列表 */
    modelPlanIndexList: {
      type: Array,
      default: () => {
        return [{
          indexCd: '104202',
          assetCd: 'DLSF',
          indexNm: '资产名称',
          custPct: 10
        }]
      },
      required: true
    }
  },
  watch: {
    // 检测指数列表变化
    modelPlanIndexList: {
      deep: true,
      immediate: false,
      handler(newVal, oldVal) {
        this.form.optConstTp = this.optConstTp
        // 如果新增操作，根据选中的指数列表刷新数据
        if ((this.currOperation === 'new') && Array.isArray(newVal)) {
          this.initModePlanIndex(newVal)
        }
        if ((this.currOperation === 'copy') && Array.isArray(newVal) && !this.isAssetTypeEqual) {
          this.initModePlanIndex(newVal)
        }
      }
    }
  },
  methods: {
    /** 初始化模型方案指数
     * @param indexList 指数列表
     **/
    initModePlanIndex(indexList) {
    }
  }
}
