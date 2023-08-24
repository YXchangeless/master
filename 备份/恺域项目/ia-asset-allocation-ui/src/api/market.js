import request from '@/utils/request'

// 市场研究列表 接口

const basePath = '/asset-allocation-main'

/**
 * 获取市场研究列表
 * @param data 市场研究详情
 */
export default {
  /**
   * 获取模型方案列表
   */
  getModelList(data) {
    return request({
      url: basePath + '/model-plan/nm-list/v1',
      method: 'post',
      data
    })
  },
  /**
   * 市场研究列表
   */
  marketList(data) {
    return request({
      url: basePath + '/market-study/list/v1',
      method: 'post',
      data
    })
  },
  /**
   * 查询列表
   */
  searchList(data) {
    return request({
      url: basePath + '/market-study/list/v1',
      method: 'post',
      data
    })
  },
  /**
   * 查看
   * @param modelPlanId 模型Id
   */
  // 查看bl模型优化结果
  getBlResult(modelPlanId) {
    return request({
      url: basePath + '/market-study/bl/result/' + modelPlanId + '/v1',
      method: 'get'
    })
  },
  // 查看rp模型优化结果
  getRpResult(modelPlanId) {
    return request({
      url: basePath + '/market-study/rp/result/' + modelPlanId + '/v1',
      method: 'get'
    })
  },
}
