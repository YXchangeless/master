import request from '@/utils/request'

// 现金流 接口

const basePath = '/asset-allocation-main'

export default {
  /**
   * 现金流
   */
  cashFlowPlan(data) {
    return request({
      url: basePath + '/cash-flow/plan/v1',
      method: 'post',
      data
    })
  }
}
