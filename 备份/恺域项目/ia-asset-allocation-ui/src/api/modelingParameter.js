import request from '@/utils/request'

// 指数名称列表
export function optimize() {
  return request({
    url: '/asset-allocation-main/model-plan/create-result/v1',
    method: 'post'
  })
}
