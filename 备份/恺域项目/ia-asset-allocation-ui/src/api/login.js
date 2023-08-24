import request from '@/utils/request'

const basePath = '/asset-allocation-auth'

export default {
  // 指数名称列表
  login(data) {
    return request({
      url: basePath + '/user/login/v1',
      method: 'post',
      data
    })
  }
}
