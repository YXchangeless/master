import request from '@/utils/request'

// 流动性管理列表 接口
const basePath = '/asset-allocation-main'

export default {
  /**
   * 流动性管理列表
   */
  mobilityList(data) {
    return request({
      url: basePath + '/cash-flow/list/v1',
      method: 'post',
      data
    })
  },
  /**
   * 上传文件
   */
  upLoad(data) {
    return request({
      url: basePath + 'cash-flow/upload/v1',
      method: 'post',
      data
    })
  }
}

