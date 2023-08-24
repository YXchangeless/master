import request from '@/utils/request'

// 指数名称列表 接口

const basePath = '/asset-allocation-main'

export default {
  /**
   * 获取模型方案列表
   */
  queryModelPlanList(data) {
    data = data || {
      /** 当前页编号 */
      pageNum: Number,
      /** 每页显示的数量：默认10条 */
      pageSize: Number,
      /** 模型方案编号：不传返回全部 */
      modelPlanIdList: String
    }
    return request({
      url: basePath + '/model-plan/list/v1',
      method: 'post',
      data
    })
  },
  /**
   * 获取模型方案名称列表
   * @example [{modelPlanId: '模型方案编号', modelPlanNm: '模型方案名称' }]
   */
  queryModelPlanNmList(data) {
    return request({
      url: basePath + '/model-plan/nm-list/v1',
      method: 'post',
      data
    })
  },
  getCreateResult(data) {
    return request({
      url: basePath + '/model-plan/create-result/v1',
      method: 'post',
      data
    })
  },
  /**
   * 修改模型方案名称
   * @param data 名称信息
   */
  updateModelPlanNm(data) {
    data = data || {
      /** 当前页编号 */
      modelPlanId: String,
      /** 模型方案编号：不传返回全部 */
      modelPlanNm: String
    }
    return request({
      url: basePath + '/model-plan/update/v1',
      method: 'post',
      data
    })
  },
  // BL 模型删除
  deleteBLModel(modelPlanId) {
    return request({
      url: basePath + '/model-plan/bl/' + modelPlanId + '/v1',
      method: 'delete'
    })
  },
  // RP 模型删除
  deleteRPModel(modelPlanId) {
    return request({
      url: basePath + '/model-plan/rp/' + modelPlanId + '/v1',
      method: 'delete'
    })
  }
}
