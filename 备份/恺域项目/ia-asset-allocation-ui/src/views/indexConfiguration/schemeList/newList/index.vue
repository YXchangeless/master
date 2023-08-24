<template>
  <div class="assets-scroll SchemeNewList">
    <div class="Content">
      <div class="title-bar"><span />{{ title }}</div>
      <!-- 查询条件 -->
      <div class="search">
        <el-form :label-position="labelPosition" label-width="100px">
          <!-- 方案名称 -->
          <el-form-item label="方案名称：">
            <el-input
              v-model="planInfo.planNm"
              :disabled="disabled"
              maxlength="30"
              placeholder="请输入方案名称"
            ></el-input>
          </el-form-item>
          <!-- end 方案名称 -->
          <!-- 账户名称  -->
          <el-form-item label="账户名称：">
            <el-select
              v-model="planInfo.accCd"
              :disabled="disabled || (!!planInfo.indexPlanId && module!=='copy')"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in accOptions"
                :key="item.accCd"
                :label="item.accNm"
                :value="item.accCd"
                :height="32"
              />
            </el-select>
          </el-form-item>
          <!-- end 账户名称 -->
        </el-form>
      </div>
      <!-- end 查询条件 -->
      <!-- 指数资产树配置 -->
      <div class="modeSelect">
        <div class="titleBox">
          <span class="titleFont">指数资产树配置</span>
        </div>
        <div class="treeBox">
          <el-button v-if="!isExpand" class="expandAll" @click="expandAll(true)">展开</el-button>
          <el-button v-else class="expandAll" @click="expandAll(false)">折叠</el-button>
          <span v-if="!disabled" class="titleButAdd" @click="addAssetDialog" />
          <el-tree
            ref="assetTree"
            :disabled="disabled"
            :data="planInfo.assetTypeList"
            node-key="assetCd"
            :props="defaultPropsTree"
            :highlight-current="true"
            :render-content="renderContent"
            style="height: 370px"
            @node-click="handleAssetNodeClick"
          />
        </div>
      </div>
      <!-- 指数资产树配置 -->
      <!-- 指数资产编辑 -->
      <div class="penetrate">
        <div class="titleBox">
          <span class="titleFont">指数资产编辑</span>
        </div>
        <div class="treeBox">
          <singleTreeTransfer
            id="indexCd"
            :all-data="allData"
            :left-data.sync="indexTransList"
            parent-id="parentCd"
            :default-props="defaultPropsTransfer"
            :right-data.sync="indexSelectedList"
            :disabled="disabled"
            @applyIndexSelect="applyIndexSelect"
          >
          </singleTreeTransfer>
        </div>
      </div>
      <!-- end 指数资产编辑 -->
      <!-- 资产大类弹窗 -->
      <el-dialog title="" :visible.sync="dialogVisible" width="30%">
        <span>资产大类 ：</span>
        <span>
          <el-select v-model="value" clearable filterable placeholder="请选择">
            <el-option
              v-for="item in assetNmList"
              :key="item.assetCd"
              :label="item.assetNm"
              :value="item.assetCd"
            />
          </el-select>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAssetNm">添 加</el-button>
        </span>
      </el-dialog>
      <!-- 资产大类弹窗 -->
    </div>
    <!-- 保存重置 按钮 -->
    <el-col :span="24" class="buttonCenter" style="margin-top: 30px">
      <el-button v-if="save" @click="resetForm">取消</el-button>
      <el-button
        v-if="save"
        type="primary"
        @click="saveIndexPlan"
      >保存
      </el-button>
    </el-col>
    <!-- end 保存重置 按钮 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import singleTreeTransfer from '@/components/treeTransfer/singleTreeTransfer'

export default {
  name: 'SchemeNewList',
  components: { singleTreeTransfer },
  data() {
    return {
      // 是否显示保存重置按钮
      save: true,
      // 查询条件右侧对齐
      labelPosition: 'right',
      // 是否显示指数资产编辑
      disabled: false,
      // 指数所有的数据
      allData: [],
      // 资产大类数组
      assetNmList: [],
      // 资产大类绑定值
      value: '',
      // 是否弹出资产大类弹窗
      dialogVisible: false,
      // 标题
      title: '新增/修改指数方案',
      // 方案信息
      planInfo: {
        indexPlanId: '',
        planNm: '',
        accCd: '',
        assetTypeList: []
      },
      // 账户列表
      accOptions: [
        {
          accCd: '',
          accNm: ''
        }
      ],
      // 资产树配置
      defaultPropsTree: {
        children: 'children',
        label: 'assetNm'
      },
      // 穿梭框资产树
      defaultPropsTransfer: {
        children: 'children',
        label: 'indexNm'
      },
      // 当前点中的资产树节点
      curAssetTreeNode: {},
      // 穿梭组件
      defaultPropsTrans: {
        key: 'indexCd',
        label: 'indexNm',
        disabled: 'disabled'
      },
      // 穿梭框可用的指数列表
      indexTransList: [],
      // 全量的指数列表
      indexList: [],
      // 指数字典 指数代码:指数名称
      indexDict: {},
      // 当前选中的大类资产的代码
      assetCd: '',
      module: '',
      // 当前选中的大类资产的名称
      assetNm: '资产大类',
      // 穿梭框移动到右端的指数代码列表
      indexSelectedList: [],
      // return 指数列表indexNm
      renderFunc(h, option) {
        return <span>{option.indexNm}</span>
      },
      // 资产大类
      direction: [],
      // 展开或者折叠
      isExpand: false
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    // 加载表单数据
    this.loading()
  },
  methods: {
    // 展开树
    expandAll(val) {
      this.isExpand = val
      const self = this
      // 将没有转换成树的原数据
      const treeList = this.planInfo.assetTypeList
      for (let i = 0; i < treeList.length; i++) {
        // 将没有转换成树的原数据设置key为... 的展开
        self.$refs.assetTree.store.nodesMap[treeList[i].assetCd].expanded = val
      }
    },
    // 渲染内容
    renderContent(h, { node, data, store }) {
      if (this.disabled) {
        return (
          <div class="custom-tree-node" style="width:100%;padding-right:10px">
            <span>{node.label}</span>
          </div>
        )
      } else if (!this.disabled && data.children) {
        return (
          <div class="custom-tree-node" style="width:100%;padding-right:10px">
            <span>{node.label}</span>
            <span class="titleButDel" on-click={() => this.delAssetDialog(node, data)}
            ></span>
          </div>
        )
      } else {
        return (
          <div class="custom-tree-node" style="width:100%;padding-right:10px">
            <span>{node.label}</span>
          </div>
        )
      }
    },
    // 加载表单数据
    loading() {
      // 查询账户列表
      this.planInfo.indexPlanId = this.$route.query.id
      this.module = this.$route.query.module
      const indexPlanId = this.planInfo.indexPlanId
      if (this.module === 'view') {
        this.title = '查看指数方案'
      } else if (this.module === 'add' || this.module === 'copy') {
        this.title = '新增指数方案'
      } else {
        this.title = '修改指数方案'
      }
      if (this.title === '查看指数方案') {
        this.save = false
        this.disabled = true
      }
      // 查看模式禁用编辑
      this.$api.common.getAccName().then((res) => {
        this.accOptions = res.data
      }).finally(() => {
        // 查询指数方案
        if (indexPlanId) {
          // 修改和查看
          this.$api.indexPlanInfo.queryInfoPlan(indexPlanId).then((res) => {
            const data = res.data
            if (data) {
              if (this.module !== 'copy') {
                this.planInfo.planNm = data.planNm
              }
              this.planInfo.accCd = data.accCd
              this.planInfo.assetTypeList = data.assetTypeList
            }
          })
        }
      })
      // 指数列表
      this.$api.indexPlanInfo.queryIndexList().then((res) => {
        this.indexList = res.data
        this.allData = JSON.parse(JSON.stringify(res.data))
        // 指数字典
        this.indexDict = {}
        res.data.forEach((indexVo) => {
          this.indexDict[indexVo.indexCd] = indexVo.indexNm
        })
      })
      this.dataTree()
    },
    // 资产树
    dataTree() {
      if (this.title === '新增指数方案') {
        this.$api.indexPlanInfo.queryAssetList().then((res) => {
          res.data.forEach((item) => {
            const asset = {
              assetCd: item.assetCd,
              assetNm: item.assetNm,
              children: []
            }
            this.planInfo.assetTypeList.push(asset)
          })
        })
      }
    },
    // 指数资产树添加按钮弹窗
    addAssetDialog() {
      this.dialogVisible = true
      if (this.assetNmList.length === 0) {
        this.$api.indexPlanInfo.queryAssetList().then((res) => {
          this.assetNmList = res.data
        })
      }
    },
    // 指数资产树删除按钮弹窗
    delAssetDialog(node, data) {
      this.$confirm(`是否要删除\"${data.assetNm}\"`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const treeRef = this.$refs['assetTree']
        if (treeRef) {
          treeRef.remove(data)
          // 重置
          this.resetAssetTree()
        }
      }).catch(() => {
      })
    },
    // 添加指数名称
    addAssetNm() {
      this.assetNmList.filter((option) => option.assetCd === this.value).forEach((option) => {
        const asset = {
          assetCd: option.assetCd,
          assetNm: option.assetNm,
          children: []
        }
        // 校验是否重复
        const idx = this.planInfo.assetTypeList.findIndex((assetOne) => assetOne.assetCd === option.assetCd
        )
        if (idx > -1) {
          this.$message.warning('请不要重复添加')
        } else {
          this.planInfo.assetTypeList.push(asset)
          this.dialogVisible = false
        }
      })
    },
    // 保存
    saveIndexPlan() {
      if (this.planInfo.accCd === '') {
        this.$message.error('请选择账户')
      } else if (this.planInfo.planNm === '') {
        this.$message.error('校验出错：指数方案名称不能为空')
      } else {
        if (this.module === 'modify') {
          this.$api.indexPlanInfo.saveIndexPlan(this.planInfo).then((res) => {
            this.$message.success('保存成功')
            this.$router.push({
              path: 'schemeList'
            })
          })
        } else {
          this.planInfo.indexPlanId = ''
          this.$api.indexPlanInfo.saveIndexPlan(this.planInfo).then((res) => {
            this.$message.success('保存成功')
            this.$router.push({
              path: 'schemeList'
            })
          })
        }
      }
    },

    // 应用指数选择
    applyIndexSelect: function(data, val) {
      // 选中的指数列表
      const selectedList = data.map((item) => ({
        assetCd: item.indexCd,
        assetNm: this.indexDict[item.indexCd]
      }))
      if (selectedList.length === 1) {
        // 应用到大类资产树
        this.planInfo.assetTypeList.filter((asset) => asset.assetCd === this.assetCd).forEach((asset) => {
          if (val) {
            asset.children = []
          } else {
            asset.children = selectedList
          }
        })
      }
      this.handleAssetNodeClick(this.curAssetTreeNode.data, this.curAssetTreeNode)
    },
    // 选中资产大类节点事件
    handleAssetNodeClick(obj, node, v) {
      if (node.level === 1) {
        this.curAssetTreeNode = node
        // 一级节点
        // 根据所有的资产大类下的指数过滤指数全集
        // 包含当前资产大类的下级，不包含其他资产大类的下级
        const excludeIndexCdList = []
        this.planInfo.assetTypeList.forEach((asset) => {
          if (asset.children && asset.children.length > 0) {
            asset.children.forEach((asset) => {
              excludeIndexCdList.push(asset.assetCd)
            })
          }
        })
        // 指数穿梭框可用的指数列表
        this.indexTransList = this.indexList
          .filter((index) => excludeIndexCdList.indexOf(index.indexCd) < 0)
          .map((index) => {
            // 如果是查看模式，所有设置成禁用
            // || (obj.children.length > 0 && (index.indexCd !== obj.children[0].assetCd))
            if ((this.disabled)) {
              index.disabled = true
            }
            return index
          })
        this.assetNm = obj.assetNm
        this.assetCd = obj.assetCd
        const children = obj.children
        if (children && children.length > 0) {
          // 过滤到要排除的指数列表
          this.indexSelectedList = [{
            indexNm: children[0].assetNm,
            indexCd: children[0].assetCd
          }]
          //   .map((c) => c.assetCd)
          //   .filter((assetCd) => excludeIndexCdList.indexOf(assetCd) < 0)
          //   // 只应用指数穿梭框可用的指数列表
          //   .filter(
          //     (assetCd) =>
          //       this.indexTransList.findIndex(
          //         (index) => index.indexCd === assetCd
          //       ) > -1
          //   )
        } else {
          this.indexSelectedList = []
        }
      }
    },
    // 重置
    resetForm() {
      if (!this.planInfo.indexPlanId) {
        this.planInfo.assetTypeList.forEach((item) => {
          item.children = []
        })
        this.planInfo.assetTypeList = []
        this.dataTree()
        this.planInfo.planNm = ''
        this.planInfo.accCd = ''
        this.assetCd = ''
      } else {
        this.$api.indexPlanInfo.queryInfoPlan(this.planInfo.indexPlanId).then((res) => {
          const data = res.data
          if (data) {
            if (this.module !== 'copy') {
              this.planInfo.planNm = data.planNm
            } else {
              this.planInfo.planNm = ''
            }
            this.planInfo.accCd = data.accCd
            this.planInfo.assetTypeList = data.assetTypeList
          }
        })
      }
      this.indexTransList = []
      this.indexSelectedList = []
      this.$refs.indexSelectedListFRef.clearQuery('left')
      this.$refs.indexSelectedListFRef.clearQuery('right')
      // this.loading()
    },
    // 重置资产树
    resetAssetTree() {
      // 删除节点后，取消当前节点，重置穿梭框
      this.curAssetTreeNode = {}
      this.assetCd = ''
      this.assetNm = '资产大类'
      this.indexTransList = []
      this.indexSelectedList = []
    }
  }
}
</script>

<style scoped>
@import "../newList/index.css";

.search {
    height: 60px;
}

.modeSelect {
    float: left;
    width: 298px;
    height: 488px;
    border: 1px solid #dbdcdc;
    border-radius: 4px;
    margin: 0px 0px 0px 20px;
}

.titleButAdd {
    width: 18px;
    height: 18px;
    display: block;
    float: right;
    background-image: url("../../../../assets/Images/add.png");
    margin: 15px 23px 0px 0px;
    cursor: pointer;
}

.titleBox {
    height: 41px;
    background: #f3f4f6;
    border-bottom: 1px solid #dbdcdc;
}

.titleFont {
    line-height: 41px;
    padding-left: 18px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4b556a;
}

</style>
<style lang="scss">
.SchemeNewList {
  .search {
    .el-input__inner {
      width: 220px;
    }

    .el-form-item--small.el-form-item {
      float: left;
    }

    form {
      div:nth-child(2) {
        margin-left: 14px;
      }
    }
  }

  height: 738px;

  .call {
    width: 78px;
    height: 32px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 32px;
    text-align: center;
    float: right;
    margin: 4px 16px 4px 0px;
  }

  .btn {
    float: right;
    padding: 14px 600px 0 0;
  }

  .el-button + .el-button {
    margin-left: 20px;
  }

  .el-tree-node__children .el-tree-node is-focusable {
    padding-left: 0px;
  }

  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
    background-color: #f5f7fa;
  }

  .penetrate {
    float: left;
    width: 720px;
    height: 488px;
    border: 1px solid #dbdcdc;
    margin: 0px 0px 0px 40px;

    .general-btn {
      width: 78px;
      height: 32px;
      background: #2a76cd;
      border-radius: 4px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 32px;
      text-align: center;
      float: right;
      margin: 4px 16px 4px 0px;
    }
  }

  /* 树状 */
  .el-transfer__button:first-child {
    float: right;
    margin-left: -35px;
    margin-top: 50px;
  }

  .el-transfer__button:nth-child(2) {
    float: left;
  }

  .el-transfer-panel__list {
    max-height: 306px;
  }

  .treeBox {
    height: 446px;

    .titleButDel {
      width: 18px;
      height: 18px;
      display: block;
      float: right;
      background-image: url("../../../../assets/Images/del.png");
      cursor: pointer;
    }

    .expandAll {
      height: 28px;
      width: 60px;
      margin: 10px 0 0 10px;
    }

    .el-transfer-panel__list.is-filterable {
      height: 326px;
      padding-top: 0;
    }

    .el-transfer-panel__filter .el-input__inner {
      border-radius: 0px;
    }

    .el-transfer-panel .el-transfer-panel__header {
      background: #fff;
      border-bottom: 0px;
      // 隐藏穿梭全选功能
      .el-checkbox {
        .el-checkbox__input {
          display: none;
        }
      }
    }

    .el-tree-node {
      padding: 20px 0px 0px 30px;
    }

    .el-button--primary {
      color: #fff;
      width: 36px;
      height: 36px;
      border-radius: 18px;
      display: block;
    }

    .el-button + .el-button {
      margin-left: 0px;
    }

    .el-transfer__buttons {
      display: inline-block;
      vertical-align: middle;
      padding: 0 6px;
    }

    .el-transfer-panel {
      width: 45%;
      height: 412px;
    }

    .el-transfer {
      padding: 14px 14px 20px 14px;
      box-sizing: border-box;
      width: 100%;
    }

    .el-tree-node {
      padding: 10px 0px 0px 10px;
    }

    .el-tree {
      margin: 5px 5px 5px 5px;
      overflow-y: scroll;
    }
  }

  .penetrate {
    width: 62%;
  }
}
</style>
