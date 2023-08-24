import request from '@/utils/request'
import { downloadPost } from '@/utils/validate'
import { downloadPost1 } from '@/utils/validate'

// 大类资产列表 接口

const basePath = '/asset-allocation-main'

export default {
  /**
   * 大类资产规模及收益分析-表格-查询
   */
  getTable(data) {
    return request({
      url: basePath + '/stock-analysis/asset-scale-income/table/v1',
      method: 'post',
      data
    })
  },
  /**
   * 大类资产规模及收益分析-图表-查询
   */
  getChart(data) {
    return request({
      url: basePath + '/stock-analysis/asset-scale-income/chart/v1',
      method: 'post',
      data
    })
  },
  /**
   * 下载excel
   */
  exportExcel(params, applicationCache, fileName) {
    downloadPost(basePath + '/stock-analysis/asset-scale-income/table/export/v1', params, applicationCache, fileName)
  },
  /**
     * 下载所有图表
   */
  exportAllCherts(params, applicationCache, fileName) {
    downloadPost1(basePath + '/stock-analysis/asset-scale-income/chart/export/v1', params, applicationCache, fileName)
  }

}

