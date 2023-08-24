import request from '@/utils/request'
import { Message } from 'element-ui'

// 市场研究列表 接口

const basePath = '/asset-allocation-main'
let accList = []
/**
 * 获取市场研究列表
 * @param data 市场研究详情
 */
export default {
  /**
   * 获获取账户名称
   */
  getAccName() {
    if (accList.length === 0) {
      return request({
        url: basePath + '/index-plan/acc-nm-list/v1',
        method: 'get'
      }).then((res) => {
        if (res.code === '200') {
          accList = res.data
        } else {
          Message.error('账户名称请求数据有问题')
        }
        return new Promise((resolve, reject) => {
          resolve({ code: '200', data: accList })
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve({ code: '200', data: accList })
      })
    }
  }
}
