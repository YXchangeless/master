import request from '@/utils/request'

const basePath = '/asset-allocation-auth'
export default {
  login(data) {
    return request({
      url: basePath + '/user/login/v1',
      method: 'post',
      data
    })
  },
  getInfo(token) {
    return request({
      url: basePath + '/user/info/v1',
      method: 'get',
      params: { token }
    })
  },
  logout() {
    return request({
      url: basePath + '/user/logout/v1',
      method: 'get'
    })
  },
  getUserInfo() {
    return request({
      url: basePath + '/user/info/v1',
      method: 'get'
    })
  },
  updatePassword(data) {
    return request({
      url: basePath + '/user/update/v1',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
