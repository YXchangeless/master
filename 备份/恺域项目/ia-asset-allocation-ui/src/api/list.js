import request from '@/utils/request'

// 复合指数列表 接口

const basePath = '/asset-allocation-main'

export default {
  /**
   * 指数名称列表
   */
  indexNmList(data) {
    return request({
      url: basePath + '/comp-index/index-nm-list/v1',
      method: 'get',
      data
    })
  },
  /**
   * 复合指数列表下拉
   */
  pullDown() {
    return request({
      url: basePath + '/comp-index/nm-list/v1',
      method: 'get'
    })
  },
  /**
   * 删除复合指数列表
   */
  delData(compIndexId) {
    return request({
      url: basePath + `/comp-index/${compIndexId}/v1`,
      method: 'delete'
    })
  },
  /**
   * 复合指数列表
   */
  indexList(data) {
    return request({
      url: basePath + '/comp-index/list/v1',
      method: 'post',
      data
    })
  },
  /**
   * 复合指数详情
   */
  pageList(compIndexId) {
    return request({
      url: `${basePath}/comp-index/details/${compIndexId}/v1`,
      method: 'get'
    })
  },
  /**
   * 复合指数修改
   */
  check(compIndexId) {
    return request({
      url: `/asset-allocation-main/comp-index/check/${compIndexId}/v1`,
      method: 'get'
    })
  },
  /**
   * 保存复合指数信息
   */
  saveCompIndexInfo(compIndexInfo) {
    return request({
      url: `${basePath}/comp-index/save/v1`,
      method: 'post',
      data: compIndexInfo
    })
  },
  /**
   * 模型方案列表
   */
  modelList(data) {
    return request({
      url: basePath + '/model-plan/list/v1',
      method: 'get',
      data
    })
  },
  /**
   * 获取模型详情信息
   */
  select(modelPlanId) {
    return request({
      url: `${basePath}/model-plan/details/${modelPlanId}/v1`,
      method: 'get'
    })
  },
  /**
   * 获取资产配置列表
   */
  assetAllocationList() {
    return request({
      url: `/asset-allocation-main/asset-config/list/v1`,
      method: 'post'
    })
  }
}
