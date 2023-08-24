import request from '@/utils/request'

// 指数方案列表 接口

const basePath = '/asset-allocation-main'

export default {
  /**
   * 敏感性测试
   */
  simulation(data) {
    return request({
      url: basePath + '/scene-simulate/get/v1',
      method: 'post',
      data
    })
  },
  /**
   * 预期特征
   */
  expectedCharacteristics(data) {
    return request({
      url: basePath + `/scene-simulate/expected-features/v1`,
      method: 'get',
      params: data
    })
  },
  /**
   *  计算
   */
  calculateData(data) {
    return request({
      url: basePath + `/scene-simulate/calc/v1`,
      method: 'post',
      data
    })
  }
}
