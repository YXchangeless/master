import request from '@/utils/request'

// 模型方案配置

const basePath = '/asset-allocation-main'
export default {
  /**
   * 获取模型方案选择页下拉框信息
   * @example {modelList: [{value:'', label:'', children: [{value:'', label:''}]}]}
   */
  queryModelSelectDropdown() {
    return request({
      url: basePath + '/model-plan/choice-dropdown/v1',
      method: 'get'
    })
  },
  /**
   * 获取模型方案配置页下拉框信息
   * @example {optObjTpList:[{value, label}], dataFreqList, modelEstTpList, incomeEstTpList, optConstSymList, }
   */
  queryModelPlanConfDropdown() {
    return request({
      url: basePath + '/model-plan/config-dropdown/v1',
      method: 'get'
    })
  },
  /**
   * 获取BL模型详情信息
   * 模型选择 + 模型参数配置
   * @param modelPlanId 模型方案信息
   */
  queryBlModelPlanInfo(modelPlanId) {
    return request({
      url: basePath + `/model-plan/bl/details/${modelPlanId}/v1`,
      method: 'get'
    })
  },
  /**
   * 获取RP模型详情信息
   * 模型选择 + 模型参数配置
   * @param modelPlanId 模型方案信息
   */
  queryRpModelPlanInfo(modelPlanId) {
    return request({
      url: basePath + `/model-plan/rp/details/${modelPlanId}/v1`,
      method: 'get'
    })
  },
  /**
   * 生成模型优化结果
   * @param modelPlanInfo 模型方案信息
   */
  queryModelPlanResult(modelPlanInfo) {
    return request({
      url: basePath + `/model-plan/bl/create-result/v1`,
      method: 'post',
      data: modelPlanInfo
    })
  },
  /**
   * 生成rp模型优化结果
   * @param modelPlanInfo rp模型方案信息
   */
  queryRPModelPlanResult(modelPlanInfo) {
    return request({
      url: basePath + `/model-plan/rp/create-result/v1`,
      method: 'post',
      data: modelPlanInfo
    })
  },
  /**
   * 保存模型优化结果
   * @param modelPlanInfo 模型方案信息
   */
  saveModelBlPlanResult(modelPlanInfo) {
    return request({
      url: basePath + `/model-plan/bl/save-result/v1`,
      method: 'post',
      data: modelPlanInfo
    })
  },
  saveModelRpPlanResult(modelPlanInfo){
    return request({
      url: basePath + `/model-plan/rp/save-result/v1`,
      method: 'post',
      data: modelPlanInfo
    })
  },
  /**
   * 校验模型方案名称
   * @param modelPlanInfo 模型方案信息
   */
  checkModelPlanNm(modelPlanInfo) {
    modelPlanInfo = modelPlanInfo || {
      modelPlanId: '',
      modelPlanNm: ''
    }
    return request({
      url: basePath + `/model-plan/check/v1`,
      method: 'post',
      data: modelPlanInfo
    })
  },
  /**
   * 查询账户现金流
   * @param accCd 账户代码
   */
  queryCashFlow(accCd) {
    return request({
      url: basePath + `/cash-flow/get/${accCd}/v1`,
      method: 'get'
    })
  }
}

