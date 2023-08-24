<template>
  <div class="assets-scroll">
    <div class="Content">
      <div class="title-bar"><span />{{ operationConf[currOperation].title }}</div>
      <div class="boundary" />
      <!-- 模型选择 start -->
      <transition name="el-fade-in-linear">
        <modeling-select
          v-show="currModule === 'modelingSelect' || operationConf[currOperation].multiModule.modelingSelect"
          ref="modelingSelect"
          :disabled="disabled"
          @changeModelCd="handleChangeModelCd"
          @changeRiskIndicNm="handleChangeRiskIndicNm"
        />
      </transition>
      <!-- 模型选择 end -->
      <!-- 模型参数 start -->
      <transition name="el-fade-in">
        <modeling-parameter
          v-show="currModule === 'modelingParameter' || operationConf[currOperation].multiModule.modelingParameter"
          ref="modelingParameter"
          :disabled="disabled"
          :model-cd="modelCd"
          :risk-indic-nm="riskIndicNm"
          :curr-operation="currOperation"
        />
      </transition>
      <!-- 模型参数 end -->
      <!-- 模型优化 start -->
      <modeling-optimized
        v-if="currModule === 'modelingOptimized' || operationConf[currOperation].multiModule.modelingOptimized"
        ref="modelingOptimized"
        :model-cd="modelCd"
        @save="handleSave"
        @getOptimized="getOptimized"
      />
      <!-- 模型优化 end -->
      <div class="but">
        <el-button
          v-if="currOperation && operationConf[currOperation].buttonDict.cancel"
          v-show="!currModule || moduleConfig[currModule].buttonDict.cancel"
          @click="handleCancel"
        >取消
        </el-button>
        <!--  上一步 if判断，当前操作是否需要这个按钮，show判断是否分模块展示，且上一步对应的模块需要展示  -->
        <el-button
          v-if="currOperation && operationConf[currOperation].buttonDict.prev"
          v-show="!currModule || (moduleConfig[currModule].buttonDict.prev && operationConf[currOperation].moduleDict[moduleConfig[currModule].moduleSwitch.prev])"
          @click="handlePrev"
        >上一步
        </el-button>
        <!--  下一步 if判断，当前操作是否需要这个按钮，show判断是否分模块展示，且下一步对应的模块需要展示  -->
        <el-button
          v-if="currOperation && operationConf[currOperation].buttonDict.next"
          v-show="!currModule || (moduleConfig[currModule].buttonDict.next && operationConf[currOperation].moduleDict[moduleConfig[currModule].moduleSwitch.next])"
          type="primary"
          @click="handleNext"
        >下一步
        </el-button>
        <el-button
          v-if="currOperation && operationConf[currOperation].buttonDict.optimized"
          v-show="!currModule || moduleConfig[currModule].buttonDict.optimized"
          type="primary"
          @click="handleOptimized('')"
        >优化
        </el-button>
        <el-button
          v-if="currOperation && operationConf[currOperation].buttonDict.save"
          v-show="!currModule || moduleConfig[currModule].buttonDict.save"
          type="primary"
          @click="handleSave"
        >保存
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import modelingSelect from './modelingSelect/index'
import modelingParameter from './modelingParameter'
import modelingOptimized from './modelingOptimized'
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'ModelPlanConfig',
  components: {
    modelingSelect, modelingParameter, modelingOptimized
  },
  data() {
    return {
      // 参数配置
      operationConf: {
        /** 新增 */
        new: {
          // 标题
          title: '新增模型方案',
          // 可用的按钮
          buttonDict: { cancel: true, prev: true, next: true, optimized: true, save: false },
          // 可用的模块
          moduleDict: {
            modelingSelect: true,
            modelingParameter: true,
            modelingOptimized: true
          },
          // 初始模块
          singleModule: 'modelingSelect',
          multiModule: {},
          disabled: false
        },
        /** 复制 */
        copy: {
          title: '新增模型方案',
          buttonDict: { cancel: true, prev: true, next: true, optimized: true, save: false },
          moduleDict: {
            modelingSelect: true,
            modelingParameter: true,
            modelingOptimized: true
          },
          singleModule: 'modelingSelect',
          // 同时显示多个模块
          multiModule: {},
          /** 禁用编辑 */
          disabled: false
        },
        /** 查看 */
        view: {
          title: '查看模型方案',
          buttonDict: { cancel: false, prev: false, next: false, optimized: false },
          moduleDict: {
            modelingSelect: true,
            modelingParameter: true,
            modelingOptimized: false
          },
          singleModule: '',
          // 同时显示多个模块
          multiModule: {
            modelingSelect: true,
            modelingParameter: true
          },
          /** 禁用编辑 */
          disabled: true
        },
        /** 编辑（优化） */
        edit: {
          title: '优化模型方案',
          buttonDict: { cancel: true, prev: true, next: false, optimized: true, save: false },
          moduleDict: {
            modelingSelect: false,
            modelingParameter: true,
            modelingOptimized: true
          },
          singleModule: 'modelingParameter',
          multiModule: {},
          disabled: false
        }
      },
      // 当前操作
      currOperation: '',
      /** 是否禁用编辑 */
      disabled: false,
      // 模块配置
      moduleConfig: {
        // 模型选择模块
        modelingSelect: {
          buttonDict: { cancel: true, prev: false, next: true, optimized: false },
          moduleSwitch: {
            // 上一步
            prev: '',
            // 下一步
            next: 'modelingParameter',
            // 优化
            optimize: ''
          }
        },
        // 模型参数配置模块
        modelingParameter: {
          buttonDict: { cancel: true, prev: true, next: false, optimized: true },
          moduleSwitch: {
            // 上一步
            prev: 'modelingSelect',
            // 下一步
            next: '',
            // 优化
            optimize: 'modelingOptimized'
          }
        },
        // 模型优化结果模块
        modelingOptimized: {
          buttonDict: { cancel: false, prev: true, next: false, optimized: false, save: true },
          moduleSwitch: {
            // 上一步
            prev: 'modelingParameter',
            // 下一步
            next: '',
            // 优化
            optimize: ''
          }
        }
      },
      //  当前模块
      currModule: '',
      // 从路由中拿到的，模型方案编号
      id: '',
      // 总的表单，用于接口提交
      form: {
        /** 模型方案编号 */
        modelPlanId: ''
      },
      // 分模块的表单，用于模块交互
      formModule: {
        modelingSelect: {},
        modelingParameter: {},
        modelingOptimized: {}
      },
      // 模型编号
      model: '',
      // 风险编号
      riskIndicNm: '',
      // 加载状态
      loading: null
    }
  },
  created() {
    this.createdloadModelPlanInfo()
  },
  // 页面离开
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.loading && this.loading.close()
    document.querySelector('.assets-container').style.border = 'none'
    next()
  },
  methods: {
    // 初始获取当前模块
    createdloadModelPlanInfo() {
      this.currOperation = this.$route.params['operation']
      this.modelCd = this.$route.query['modelCd']
      // 编辑状态
      this.disabled = this.operationConf[this.currOperation].disabled
      this.currModule = this.operationConf[this.currOperation].singleModule
      const id = this.$route.query['id']
      this.id = id
      this.form.modelPlanId = id
      this.loadModelPlanInfo(id).then(value => {
        // 给初始化模块setForm
        const singleModule = this.operationConf[this.currOperation].singleModule
        const multiModule = this.operationConf[this.currOperation].multiModule
        const obj = {}
        obj[singleModule] = true
        const assign = Object.assign(obj, multiModule)
        for (const singleModuleKey of Object.keys(assign)) {
          if (singleModuleKey) {
            const module = this.$refs[singleModuleKey]
            if (module && module.setForm) {
              if (this.operationConf[this.currOperation] === this.operationConf.edit) {
                module.setForm(this.form)
              } else {
                module.setForm(this.form, 'multi')
              }
            }
          }
        }
      })
    },
    // 查询模型信息
    queryModelPlanInfo(modelPlanId) {
      return new Promise((resolve, reject) => {
        if (this.modelCd === 'BL') {
          this.$api.modelPlanConf.queryBlModelPlanInfo(modelPlanId).then((res) => {
            resolve(res)
          })
        } else {
          this.$api.modelPlanConf.queryRpModelPlanInfo(modelPlanId).then((res) => {
            resolve(res)
          })
        }
      })
    },
    /** 加载模型方案信息 */
    loadModelPlanInfo(modelPlanId) {
      return new Promise((resolve, reject) => {
        if (this.operationConf[this.currOperation] === this.operationConf.edit) {
          // 编辑（优化）
          this.queryModelPlanInfo(modelPlanId).then(({ data }) => {
            if (data.optConstTp === 'multi') {
              data.modelConfMulti.headerList.forEach((item) => {
                item.disabled = false
              })
            } else {
              data.modelConfSingleList.forEach((item) => {
                item.disabled = false
              })
            }
            this.form = data
            this.modelCd = data.modelCd
            this.$api.modelPlanConf.queryModelSelectDropdown().then((res) => {
              const modelList = res.data.modelList
              const model = modelList.find(model => model.value === this.modelCd)
              let riskIndicList = []
              if (model && model.children) {
                riskIndicList = [...model.children]
              }
              // 处理标准差名称，参数配置时显示
              const find = riskIndicList.find(riskIndic => riskIndic.value === data.riskIndicCd)
              this.riskIndicNm = find && 'label' in find ? find.label : ''
            })
            resolve(data)
          }).catch(reason => {
            reject(reason)
          })
        } else if (this.operationConf[this.currOperation] === this.operationConf.view) {
          // 查看
          this.queryModelPlanInfo(modelPlanId).then(({ data }) => {
            if (data.optConstTp === 'multi') {
              data.modelConfMulti.headerList.forEach((item) => {
                item.disabled = false
              })
            } else {
              data.modelConfSingleList.forEach((item) => {
                item.disabled = false
              })
            }
            this.form = data
            resolve(data)
          }).catch(reason => {
            reject(reason)
          })
        } else if (this.operationConf[this.currOperation] === this.operationConf.copy) {
          // 复制
          this.queryModelPlanInfo(modelPlanId).then(({ data }) => {
            if (data.optConstTp === 'multi') {
              data.modelConfMulti.headerList.forEach((item) => {
                item.disabled = false
              })
            } else {
              data.modelConfSingleList.forEach((item) => {
                item.disabled = false
              })
            }
            this.form = data
            resolve(data)
          }).catch(reason => {
            reject(reason)
          })
        } else {
          resolve()
        }
      })
    },
    // 取消逻辑
    handleCancel() {
      if (this.currOperation === 'new') {
        this.$refs[this.currModule].handleCancel(this.form)
      } else if (this.currOperation === 'copy') {
        this.loadModelPlanInfo(this.id).then(() => {
          if (this.currModule === 'modelingParameter') {
            this.$refs['modelingSelect'].getForm().then((form) => {
              this.form.isAssetTypeEqual = this.$refs['modelingSelect'].isEqual(form.modelPlanIndexList, this.form.modelPlanIndexList)
              for (const formKey in form) {
                // 对方存在的才赋值
                if (formKey in form && formKey !== 'isAssetTypeEqual') {
                  this.form[formKey] = form[formKey]
                }
              }
              form.modelPlanIndexList.forEach((item) => {
                item.indexCd = item.children[0].assetCd
                item.indexNm = item.children[0].assetCd
              })
              // this.form = Object.assign(this.form, form)
              this.form.modelPlanIndexList = form.modelPlanIndexList
              this.$refs[this.currModule].handleCancel(this.form)
            })
          } else {
            this.$refs['modelingParameter'].modelPlanIndexList = []
            this.$refs[this.currModule].handleCancel(this.form)
          }
        })
      } else if (this.currOperation === 'edit') {
        this.loadModelPlanInfo(this.id).then((form) => {
          this.form = Object.assign(this.form, form)
          this.$refs['modelingParameter'].handleCancel(this.form)
        })
      }
    },
    // 处理事件 上一步
    handlePrev() {
      // 返回上一个模块
      const oldModule = this.currModule
      if (this.currOperation === 'copy') {
        this.$refs[this.currModule].getForm(true).then((form) => {
          this.form = Object.assign(this.form, form)
        })
      }
      const preModule = this.moduleConfig[oldModule].moduleSwitch.prev
      if (preModule) {
        this.currModule = preModule
        scrollTo(0, 800)
      }
    },
    // 处理事件 下一步
    handleNext() {
      this.handleGetForm(() => {
        // 跳转到下一个模块
        const oldModule = this.currModule
        const nextModule = this.moduleConfig[oldModule].moduleSwitch.next
        if (nextModule) {
          this.currModule = nextModule
          const module = this.$refs[this.currModule]
          if (module && module.setForm) {
            // 调用下一个模块的setForm方法
            if (this.operationConf[this.currOperation] === this.operationConf.copy) {
              module.setForm(this.form)
            } else {
              module.setForm(this.form, 'new')
            }
          }
          scrollTo(0, 800)
        }
      })
    },
    // 优化
    getOptimized() {
      const module = this.$refs[this.currModule]
      module.getForm().then(form => {
        this.form.cacheKey = form.cacheKey
        this.form.positionDt = form.positionDt
      }).catch(err => {
        this.$message.warning(err)
      })
      if (this.form.modelCd === 'RP') {
        document.querySelector('.assets-container').style.border = '1px solid #DBDCDC'
        this.loading = this.$loading({
          target: document.querySelector('.assets-container'),
          lock: true,
          text: '正在加载中'
        })
        this.$api.modelPlanConf.queryRPModelPlanResult(this.form).then(({ data }) => {
          this.loading.close()
          this.$nextTick(() => {
            // 调用模块setForm方法
            const module = this.$refs[this.currModule]
            if (module && module.setForm) {
              // 调用下一个模块的setForm方法
              module.setForm(Object.assign({}, this.form, data))
            }
          })
          document.querySelector('.assets-container').style.border = 'none'
        }).catch(() => {
          // 关闭等待特效
          setTimeout(() => {
            this.loading.close()
            document.querySelector('.assets-container').style.border = 'none'
          }, 800)
        })
      } else {
        document.querySelector('.assets-container').style.border = '1px solid #DBDCDC'
        this.loading = this.$loading({
          target: document.querySelector('.assets-container'),
          lock: true,
          text: '正在优化中'
        })
        this.$api.modelPlanConf.queryModelPlanResult(this.form).then(({ data }) => {
          // 关闭加载中
          this.loading.close()
          this.$nextTick(() => {
            // 调用模块setForm方法
            const module = this.$refs[this.currModule]
            if (module && module.setForm) {
              // 调用下一个模块的setForm方法
              module.setForm(Object.assign({}, this.form, data))
            }
          })
          document.querySelector('.assets-container').style.border = 'none'
        }).catch(() => {
          // 关闭等待特效
          setTimeout(() => {
            this.loading.close()
            document.querySelector('.assets-container').style.border = 'none'
          }, 800)
        })
      }
    },
    // 处理事件 优化
    handleOptimized() {
      this.handleGetForm(() => {
        for (let i = 0; i < this.form.rpModelInfo.modelConfRpWeightList.length; i++) {
          if (this.form.rpModelInfo.modelConfRpWeightList.length === 1) {
            this.form.rpModelInfo.modelConfRpWeightList.splice(1, 1)
          }
        }
        // todo 加个等待特效 建议改成 弹窗加等待特效
        if (this.form.modelCd === 'RP') {
          if (Number(this.form.rpModelInfo.startDt.replace(/-/g, '')) >= Number(this.form.rpModelInfo.endDt.replace(/-/g, ''))) {
            this.$message.warning('时间段开始时间不能大于等于结束时间')
            return
          }
          const startTime = new Date().getTime()
          document.querySelector('.assets-container').style.border = '1px solid #DBDCDC'
          this.loading = this.$loading({
            target: document.querySelector('.assets-container'),
            lock: true,
            text: '正在优化中'
          })
          if (this.currOperation === 'copy') {
            this.form.modelPlanId = ''
          }
          if (this.form.modelCd === 'RP') {
            delete this.form.blModelInfo
          } else {
            delete this.form.rpModelInfo
          }
          this.$api.modelPlanConf.queryRPModelPlanResult(this.form).then(({ data }) => {
            // todo 调到模型优化结果 需要放到请求成功里
            // 切换模块
            const oldModule = this.currModule
            const optimizeModule = this.moduleConfig[oldModule].moduleSwitch.optimize
            if (optimizeModule) {
              // 关闭等待特效 至少等待6s
              const endTime = new Date().getTime()
              let delayTime = endTime - startTime
              delayTime = delayTime > 6000 ? 0 : 6000 - delayTime
              setTimeout(() => {
                // 关闭加载中
                this.loading.close()
                document.querySelector('.assets-container').style.border = 'none'
                // 切换模块
                this.currModule = optimizeModule
                this.$nextTick(() => {
                  // 调用模块setForm方法
                  const module = this.$refs[this.currModule]
                  if (module && module.setForm) {
                    // 调用下一个模块的setForm方法
                    module.setForm(Object.assign({}, this.form, data))
                  }
                })
                // 滚动到顶
                scrollTo(0, 800)
              }, delayTime)
            }
          }).catch(() => {
            // 关闭等待特效
            setTimeout(() => {
              this.loading.close()
              document.querySelector('.assets-container').style.border = 'none'
            }, 800)
          })
        } else {
          if (Number(this.form.blModelInfo.startDt.replace(/-/g, '')) >= Number(this.form.blModelInfo.endDt.replace(/-/g, ''))) {
            this.$message.warning('回测样本区间开始时间不能大于等于结束时间')
            return
          }
          const startTime = new Date().getTime()
          document.querySelector('.assets-container').style.border = '1px solid #DBDCDC'
          this.loading = this.$loading({
            target: document.querySelector('.assets-container'),
            lock: true,
            text: '正在优化中'
          })
          if (this.currOperation === 'copy') {
            this.form.modelPlanId = ''
          }
          delete this.form.cacheKey
          this.$api.modelPlanConf.queryModelPlanResult(this.form).then(({ data }) => {
            // todo 调到模型优化结果 需要放到请求成功里
            // 切换模块
            const oldModule = this.currModule
            const optimizeModule = this.moduleConfig[oldModule].moduleSwitch.optimize
            if (optimizeModule) {
              // 关闭等待特效 至少等待6s
              const endTime = new Date().getTime()
              let delayTime = endTime - startTime
              delayTime = delayTime > 6000 ? 0 : 6000 - delayTime
              setTimeout(() => {
                // 关闭加载中
                this.loading.close()
                document.querySelector('.assets-container').style.border = 'none'
                // 切换模块
                this.currModule = optimizeModule
                this.$nextTick(() => {
                  // 调用模块setForm方法
                  const module = this.$refs[this.currModule]
                  if (module && module.setForm) {
                    // 调用下一个模块的setForm方法
                    module.setForm(Object.assign({}, this.form, data))
                  }
                })
                // 滚动到顶
                scrollTo(0, 800)
              }, delayTime)
            }
          }).catch(() => {
            // 关闭等待特效
            setTimeout(() => {
              this.loading.close()
              document.querySelector('.assets-container').style.border = 'none'
            }, 800)
          })
        }
      })
    },
    // 获取模块表单项
    handleGetForm(callback) {
      // 获取当前模块的结果，统一提供getForm方法，调用返回数据
      const module = this.$refs[this.currModule]
      if (module && module.getForm) {
        module.getForm().then(form => {
          this.formModule[this.currModule] = form
          if (this.currModule === 'modelingSelect') {
            form.modelPlanIndexList.forEach((item) => {
              item.indexCd = item.children[0].assetCd
              item.indexNm = item.children[0].assetCd
            })
          }
          this.form = Object.assign(this.form, form)
          callback && callback()
        }).catch(err => {
          this.$message.warning(err)
          scrollTo(0, 800)
        })
      } else {
        throw new Error(`模块${this.currModule}没有定义getForm方法`)
      }
    },
    // 保存模型优化结果
    saveModelPlanResult(modelPlanId) {
      return new Promise((resolve, reject) => {
        if (this.modelCd === 'BL') {
          this.$api.modelPlanConf.saveModelBlPlanResult(modelPlanId).then((res) => {
            resolve(res)
          })
        } else {
          this.$api.modelPlanConf.saveModelRpPlanResult(modelPlanId).then((res) => {
            resolve(res)
          })
        }
      })
    },
    // 处理保存
    handleSave() {
      this.handleGetForm(() => {
        // todo 先测通保存逻辑
        // todo form丢失id
        document.querySelector('.assets-container').style.border = '1px solid #DBDCDC'
        this.loading = this.$loading({
          target: document.querySelector('.assets-container'),
          lock: true,
          text: '正在保存中'
        })
        const modelPlanInfo = { ...this.form }
        modelPlanInfo.modelPlanId = this.id
        if (this.operationConf[this.currOperation] === this.operationConf.copy) {
          modelPlanInfo.modelPlanId = null
        }
        this.saveModelPlanResult(modelPlanInfo).then(() => {
          this.$message.success('保存优化结果成功')
          this.loading.close()
          document.querySelector('.assets-container').style.border = 'none'
          // todo 路由返回列表页
          setTimeout(() => {
            // this.handleCancel()
            this.$router.push({
              path: '/modelConfig/modelPlanList'
            })
          }, 500)
        })
      })
    },
    // 获取模型编号
    handleChangeModelCd(modelCd) {
      this.modelCd = modelCd
    },
    // 获取风险指标编号
    handleChangeRiskIndicNm(riskIndicNm) {
      this.riskIndicNm = riskIndicNm
    }
  }
}
</script>

<style scoped>
.but {
    height: 34px;
    width: 280px;
    margin: 30px auto;
}

.but >>> .el-button {
    color: #666666;
    width: 78px;
    height: 32px;
    padding: 0px;
}

.but >>> .el-button + .el-button {
    margin-left: 20px;
}

.but >>> .el-button--primary {
    background: #2a76cd;
    color: #ffffff;
}
</style>
