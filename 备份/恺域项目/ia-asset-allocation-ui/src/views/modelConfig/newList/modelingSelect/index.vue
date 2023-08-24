<template>
  <!--  // 模型方案-->
  <div class="modelingSelect">
    <div>
      <el-form ref="form" :model="form" :rules="rules" class="conditionFilter" :disabled="disabled">
        <el-row>
          <el-col :span="9" class="widthOne">
            <el-form-item label="模型方案名称 ：" prop="modelPlanNm" label-width="116px">
              <el-input v-model="form.modelPlanNm" style="width:220px" type="text" value="请输入" :disabled="disabled" />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="widthTwo">
            <el-form-item label="账户名称 ：" prop="accCd" label-width="93px">
              <el-select
                v-model="form.accCd"
                clearable
                filterable
                placeholder="请选择"
                :disabled="disabled"
                @change="handleSelectAcc"
              >
                <el-option
                  v-for="item in accNmList"
                  :key="item.accCd"
                  :label="item.accNm"
                  :value="item.accCd"
                  :height="32"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7" class="widthOne">
            <el-form-item label="选择指数方案 ：" prop="indexPlanId" label-width="116px">
              <el-select
                v-model="form.indexPlanId"
                clearable
                filterable
                placeholder="请选择"
                :disabled="disabled"
                @change="handleSelectIndexPlan"
              >
                <el-option
                  v-for="item in indexPlanNmList"
                  :key="item.indexPlanId"
                  :label="item.planNm"
                  :value="item.indexPlanId"
                  :height="32"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" class="widthOne">
            <el-form-item label="模型选择 ：" label-width="115px" prop="modelCd">
              <el-select
                v-model="form.modelCd"
                clearable
                filterable
                placeholder="请选择"
                :disabled="disabled||isModel"
                @change="handleSelectModel"
              >
                <el-option
                  v-for="item in modelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :height="32"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="widthTwo">
            <el-form-item label="风险指数 ：" prop="riskIndicCd" label-width="93px">
              <el-select v-model="form.riskIndicCd" clearable filterable placeholder="请选择" :disabled="disabled">
                <el-option
                  v-for="item in riskIndicList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :height="32"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <mutil-tree-transfer
        id="assetCd"
        :all-data="allData"
        :left-data.sync="assetTypeList"
        :default-props="defaultProps"
        parent-id="parentCd"
        :right-data.sync="checkedAssetTypeList"
        :disabled="disabled"
      ></mutil-tree-transfer>
      <div class="clear-float" />
    </div>

  </div>
</template>

<script>
import mutilTreeTransfer from '@/components/treeTransfer/mutilTreeTransfer'

export default {
  name: 'ModelingSelect',
  components: { mutilTreeTransfer },
  props: {
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      // 模型方案编号
      id: '',
      // 是否可以改变模型
      isModel: false,
      // 模型列表
      modelList: [],
      // 风险指数列表
      riskIndicList: [],
      // 账户名称列表
      accNmList: [],
      // 指数方案名称列表
      indexPlanNmList: [],
      // 表单项
      modelPlanId: '',
      // 模型选中数据
      form: {
        modelPlanNm: '',
        accCd: '',
        modelCd: '',
        indexPlanId: '',
        riskIndicCd: '',
        modelPlanIndexList: []
      },
      // 左侧资产树
      assetTypeList: [],
      // 右侧 指数列表
      checkedAssetTypeList: [],
      // 默认属性
      defaultProps: {
        children: 'children',
        label: 'assetNm'
      },
      // 全部数据
      allData: [],
      // 校验规则
      rules: {
        modelPlanNm: [{ validator: this.checkModelPlanNm, trigger: 'blur' },
          { required: true, message: '模型方案名称不能为空', trigger: 'change' }],
        accCd: [{ required: true, message: '请选择账户', trigger: 'change' }],
        indexPlanId: [{ required: true, message: '请选择指数方案', trigger: 'change' }],
        modelCd: [{ required: true, message: '请选择模型', trigger: 'change' }],
        riskIndicCd: [{ required: true, message: '请选择风险指标', trigger: 'change' }]
      },
      // 备份指数资产
      checkedAssetTypeListCopy: []
    }
  },
  watch: {
    // 模型编号发生改变
    'form.modelCd': {
      handler(val) {
        this.$emit('changeModelCd', val)
      }
    },
    // 风险编号发生改变
    'form.riskIndicCd': {
      handler(val) {
        // 处理标准差名称，参数配置时显示
        const find = this.riskIndicList.find(riskIndic => riskIndic.value === this.form.riskIndicCd)
        const riskIndicNm = find && 'label' in find ? find.label : ''
        this.$emit('changeRiskIndicNm', riskIndicNm)
      }
    }
  },
  methods: {
    // 账户名称选择
    handleSelectAcc(accCd, defaultVal = '') {
      if (!accCd && defaultVal) {
        // 没选中账户的情况下不展示指数方案列表
        this.form.indexPlanId = ''
        this.indexPlanNmList = []
        return
      }
      // 指数方案
      this.$api.indexPlanList.queryPlanNmList({ accCdList: [accCd] }).then(({ data }) => {
        this.indexPlanNmList = [...data]
        this.$nextTick(() => {
          this.form.indexPlanId = defaultVal
        })
      })
    },
    // 选择指数方案
    handleSelectIndexPlan(indexPlanId) {
      if (indexPlanId) {
        this.$api.indexPlanInfo.queryInfoPlan(indexPlanId).then(({ data }) => {
          const treeList = [...data.assetTypeList] || []
          this.fillPidTreeList(treeList, 'assetCd', 'parentCd')
          this.allData = treeList
          this.assetTypeList = JSON.parse(JSON.stringify(treeList))
        })
      } else {
        this.allData = []
        this.assetTypeList = []
      }
      this.checkedAssetTypeList = []
    },
    // 模型选择
    handleSelectModel(modelCd, defaultVal = '') {
      const modelList = this.modelList
      const model = modelList.find(model => model.value === modelCd)
      if (model && model.children) {
        this.riskIndicList = [...model.children]
        this.form.riskIndicCd = defaultVal
      }
    },
    /**
     * 给所有的下级填充pid
     * todo 考虑移动到util里
     * @param treeList 当前级别属性名
     * @param propId 当前编号属性名
     * @param propPid 上级编号属性名
     * @param propChildren 下级列表属性名
     * */
    fillPidTreeList(treeList, propId =
      'id', propPid = 'pid', propChildren = 'children') {
      if (treeList && Array.isArray(treeList)) {
        treeList.forEach(node => {
          const currId = node[propId]
          const currChildren = node[propChildren]
          if (currChildren && Array.isArray(currChildren)) {
            currChildren.forEach(child => {
              if (child) {
                child[propPid] = currId
                if (child.children) {
                  this.fillPidTreeList(treeList, propId, propPid, propChildren)
                }
              }
            })
          }
        })
      }
    },
    // 判断是否相等
    isEqual(arr1, arr2) {
      return arr1.length === arr2.length && arr1.every((item1, index) => {
        return item1.assetCd === arr2[index].assetCd
      })
    },
    // 事件处理 end
    // 校验模型方案名称
    checkModelPlanNm(rule, value, callback) {
      if (!value) {
        return callback(new Error('模型方案名称不能为空'))
      }
      const modelPlanInfo = {
        modelPlanNm: this.form.modelPlanNm
      }
      this.$api.modelPlanConf.checkModelPlanNm(modelPlanInfo).then(({ data }) => {
        callback()
      }).catch(err => {
        callback(new Error(err.message))
      })
    },
    // 取消
    handleCancel(form) {
      this.handleForm(form)
    },
    // 获取表单数据
    getForm() {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate((valid) => {
          if (valid && this.checkedAssetTypeList.length > 1) {
            // 成功
            // 处理标准差名称，参数配置时显示
            const find = this.riskIndicList.find(riskIndic => riskIndic.value === this.form.riskIndicCd)
            this.form.riskIndicNm = find && 'label' in find ? find.label : ''
            this.form.isAssetTypeEqual = this.isEqual(this.checkedAssetTypeList, this.checkedAssetTypeListCopy)
            if (!this.form.isAssetTypeEqual) {
              this.checkedAssetTypeListCopy = JSON.parse(JSON.stringify(this.checkedAssetTypeList))
            }
            this.form.modelPlanIndexList = JSON.parse(JSON.stringify(this.checkedAssetTypeList))
            resolve(this.form)
          } else {
            if (!valid) {
              reject('模型方案基础信息设置每一项都不能为空')
            } else {
              reject('请选择资产树对应指数并且已选中的指数资产至少有2项')
            }
          }
        })
      })
    },
    // 处理form数据
    handleForm(form) {
      this.$refs['form'] && this.$refs['form'].resetFields()
      // 模型方案id
      this.id = form.modelPlanId
      // 初始化表单
      if (form.modelPlanId) {
        // 只取需要的字段
        for (const formKey in this.form) {
          // 对方存在的才赋值
          if (formKey in form) {
            if (!(this.$route.params['operation'] === 'copy' && formKey === 'modelPlanNm')) {
              this.form[formKey] = form[formKey]
            }
          }
        }
        if (this.$route.params['operation'] === 'copy') {
          this.isModel = true
        }
        this.handleSelectAcc(this.form.accCd, this.form.indexPlanId)
        this.handleSelectModel(this.form.modelCd, this.form.riskIndicCd)
        if (this.form.accCd) {
          // 如果选择账户则加载指数方案
          this.$api.indexPlanList.queryPlanNmList({ accCdList: [this.form.accCd] }).then(({ data }) => {
            this.indexPlanNmList = data
          })
        }
        // 选中的
        if (form.modelPlanIndexList) {
          const treeList = [...form.indexAssetTypeList] || []
          this.fillPidTreeList(treeList, 'assetCd', 'parentCd')
          this.allData = JSON.parse(JSON.stringify(treeList))
          form.modelPlanIndexList.forEach(item => {
            item.children = [{
              assetCd: '',
              assetNm: ''
            }]
            item.children[0].assetCd = item.indexCd
            item.children[0].assetNm = item.indexNm
          })
          this.checkedAssetTypeList = JSON.parse(JSON.stringify(form.modelPlanIndexList))
          this.checkedAssetTypeListCopy = JSON.parse(JSON.stringify(this.checkedAssetTypeList))
          let flag = false
          this.assetTypeList = treeList.filter((item1, index) => {
            flag = false
            this.checkedAssetTypeList.forEach((item2) => {
              if (item1.assetCd === item2.assetCd) {
                flag = true
              }
            })
            if (!flag) {
              return item1
            }
          })
        }
      } else {
        this.form = {
          modelPlanNm: '',
          accCd: '',
          modelCd: '',
          indexPlanId: '',
          riskIndicCd: '',
          modelPlanIndexList: []
        }
        this.assetTypeList = []
        this.checkedAssetTypeList = []
      }
    },
    // 设置表单数据
    setForm(form) {
      if (this.modelList.length === 0 || this.accNmList.length === 0) {
        Promise.all([new Promise((resolve, reject) => {
          this.$api.common.getAccName().then(({ data }) => {
            this.accNmList = data
            resolve()
          })
        }), new Promise((resolve, reject) => {
          this.$api.modelPlanConf.queryModelSelectDropdown().then(({ data }) => {
            this.modelList = data.modelList
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
.modelingSelect {
  .widthTwo {
    width: 32%
  }

  .widthOne {
    width: 34%
  }

  .conditionFilter .el-form-item__label {
    padding: 0
  }
}
</style>
<style scoped>
.search > ul > li {
    float: left;
    line-height: 82px;
}

.clear-float {
    clear: left;
}
</style>
