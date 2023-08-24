import request from '@/utils/request'

// 指数方案信息 新增/编辑 接口

const basePath = '/asset-allocation-main'

export default {
  /**
   * 指数方案保存
   * @param data 指数方案详情
   * @returns {AxiosPromise}
   */
  saveIndexPlan(data) {
    return request({
      url: basePath + '/index-plan/save/v1',
      method: 'post',
      data
    })
  },
  /**
   * 指数方案回显
   * @param indexPlanId 指数方案编号
   * @returns {AxiosPromise}
   */
  queryInfoPlan(indexPlanId) {
    return request({
      url: basePath + `/index-plan/details/${indexPlanId}/v1`,
      method: 'get'
    })
  },
  /**
   * 获取账户名称列表
   */
  queryAccList() {
    return request({
      url: `${basePath}/index-plan/acc-nm-list/v1`,
      method: 'get'
    })
  },
  /**
   * 获取指数列表
   */
  queryIndexList() {
    return request({
      url: `${basePath}/comp-index/all-index-nm-list/v1`,
      method: 'get'
    })
  },
  /**
   * 获取资产名称列表
   */
  queryAssetList() {
    return request({
      url: `${basePath}/index-plan/asset-nm-list/v1`,
      method: 'get'
    })
  }
}

