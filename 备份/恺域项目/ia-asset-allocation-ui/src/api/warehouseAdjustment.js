import request from '@/utils/request'
import { downloadPost } from '@/utils/validate'

const basePath = '/asset-allocation-main'

/**
 * 调仓分析列表
 * @param data 调仓分析详情
 */
export default {
  /**
   * 获取调仓分析列表
   */
  getTable(data) {
    return request({
      url: basePath + '/tran-pos/transfer-pos-analy-list/v1',
      method: 'post',
      data
    })
  },
  /**
   * 获取调仓分析统计图
   */
  getEcahrts(data) {
    return request({
      url: basePath + '/tran-pos/transfer-pos-analy-weight/v1',
      method: 'post',
      data
    })
  },
  /**
   * 资产权重配置列表（资产阈值配置按钮）
   */
  getAccAssetPctList(data) {
    return request({
      url: basePath + '/tran-pos/acc-asset-pct-list/v1',
      method: 'post',
      data
    })
  },
  /**
   * 添加资产权重阈值配置（保存按钮）
   */
  addBatchAccAssetPct(data) {
    return request({
      url: basePath + '/tran-pos/batch-acc-asset/v1',
      method: 'put',
      data
    })
  },
  /**
   * 恢复资产权重阈值配置初始化（初始化按钮）
   */
  delAccAssetPct(data) {
    return request({
      url: basePath + `/tran-pos/acc-asset-pct/${data.id}/v1`,
      method: 'delete'
    })
  },
  // /**
  //  * 导出excel数据
  //  */
  // downloadTransferPosAnaly(params, applicationCache, fileName) {
  //   downloadPost(basePath + '/tran-pos/download-transfer-pos-analy/v1', params, applicationCache, fileName)
  // }
}
