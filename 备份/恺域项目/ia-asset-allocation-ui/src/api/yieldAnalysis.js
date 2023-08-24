import request from '@/utils/request'
import { downloadPost } from '@/utils/validate'

// 大类资产列表 接口

const basePath = '/asset-allocation-main'

export default {
  /**
   * 固收类收益率分析-查询
   */
  getTable(data) {
    return request({
      url: basePath + '/stock-analysis/fixed-yield/table/v1',
      method: 'post',
      data
    })
  },
  /**
   * 下载excel
   */
  exportTable(params, applicationCache, fileName) {
    downloadPost(basePath + '/stock-analysis/fixed-yield/table/export/v1', params, applicationCache, fileName)
  }

}

