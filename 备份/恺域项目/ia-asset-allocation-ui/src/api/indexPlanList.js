import request from '@/utils/request'

// 指数方案列表 接口

const basePath = '/asset-allocation-main'

/**
 * 获取指数方案列表
 * @param data 指数方案详情
 */
export default {
  /**
   * 获取指数方案列表
   * @param data 指数方案详情
   */
  queryIndexPlanList(data) {
    return request({
      url: basePath + '/index-plan/list/v1',
      method: 'post',
      data
    })
  },
  getCreateResult(data) {
    return request({
      url: basePath + '/model-plan/create-result/v1',
      method: 'post',
      data
    })
  },
  /**
   * 获取指数方案名称列表
   */
  queryPlanNmList(data) {
    return request({
      url: basePath + '/index-plan/nm-list/v1',
      method: 'post',
      data
    })
  },
  /**
   * 删除指数方案
   * @param indexPlanId 指数方案编号
   */
  deleteIndexPlan(indexPlanId) {
    return request({
      url: basePath + `/index-plan/${indexPlanId}/v1`,
      method: 'delete'
    })
  },
  /**
   * 获取指数方案修改校验
   */
  modifyData(indexPlanId) {
    return request({
      url: basePath + `/index-plan/check/${indexPlanId}/v1`,
      method: 'get'
    })
  }
}

