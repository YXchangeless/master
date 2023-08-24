import request from '@/utils/request'

// 大类资产列表   接口

const basePath = '/asset-allocation-main'

export default {
  /**
   * 获取模型下拉
   */
  getAccountName(data) {
    return request({
      url: basePath + '/model-plan/nm-list/v1',
      method: 'post',
      data
    })
  },
  /**
   * 获取资产配置列表
   */
  getAssetList(data) {
    return request({
      url: basePath + '/asset-config/list/v1',
      method: 'post',
      data
    })
  },
  /**
   * 查询列表
   */
  searchList(data) {
    return request({
      url: basePath + '/asset-config/list/v1',
      method: 'post',
      data
    })
  },
  // 查看bl模型优化结果
  getBlResult(modelPlanId) {
    return request({
      url: basePath + '/asset-config/bl/result/' + modelPlanId + '/v1',
      method: 'get'
    })
  },
  // 查看rp模型优化结果
  getRpResult(modelPlanId) {
    return request({
      url: basePath + '/asset-config/rp/result/' + modelPlanId + '/v1',
      method: 'get'
    })
  }
}

