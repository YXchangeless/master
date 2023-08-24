import request from '@/utils/request'

// 再平衡 接口

const basePath = '/asset-allocation-main'

export default {
  /**
   * 再平衡
   */
  rebalance(data) {
    return request({
      url: basePath + '/rebalance/calculate/v1',
      method: 'post',
      data
    })
  }
}
