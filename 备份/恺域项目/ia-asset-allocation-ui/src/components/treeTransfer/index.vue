<template>
  <div class="transfer" style="width:100%;display: flex;justify-content: center;align-content: center">
    <!-- 指数资产树 -->
    <div class="modeSelect">
      <div class="titleBox">
        <el-checkbox
          v-model="checkedLeftAll"
          class="titleFont"
          :disabled="disabled"
          :indeterminate="isLeftIndeterminate"
          @change="handleCheckLeftAllChange"
        >指数资产树
        </el-checkbox>
        <span class="titleFont treeTatio"> {{ treeLeftTatio }}</span>
      </div>
      <div class="treeBox">
        <el-tree
          ref="treeLeft"
          :data="leftData"
          :show-checkbox="disabled?false:true"
          :node-key="id"
          :props="defaultProps"
          default-expand-all
          highlight-current
          :expand-on-click-node="false"
          @check-change="handleLeftAssetTreeCheckChange"
        />
      </div>
    </div>
    <!-- 左右按钮 -->
    <div class="transferButtons">
      <div class="buttons">
        <el-button
          type="primary"
          :disabled="toRightButton"
          icon="el-icon-arrow-right"
          circle
          @click="toRight"
        ></el-button>
        <el-button type="primary" :disabled="toLeftButton" icon="el-icon-arrow-left" circle @click="toLeft"></el-button>
      </div>
    </div>
    <!--  已选中的指数资产  -->
    <div class="penetrate">
      <div class="titleBox">
        <el-checkbox
          v-model="checkedRightAll"
          class="titleFont"
          :disabled="disabled"
          :indeterminate="isRightIndeterminate"
          @change="handleCheckRightAllChange"
        >已选中的指数资产
        </el-checkbox>
        <span class="titleFont treeTatio"> {{ treeRightTatio }}</span>
      </div>
      <div class="treeBox">
        <el-tree
          ref="treeRight"
          :data="rightData"
          :props="defaultProps"
          :show-checkbox="disabled?false:true"
          :node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          @check-change="handleRightAssetTreeCheckChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeTransfer',
  props: {
    // 全部数据
    allData: {
      type: Array,
      default: () => []
    },
    // 左侧数据
    leftData: {
      type: Array,
      default: () => []
    },
    // 右侧数据
    rightData: {
      type: Array,
      default: () => []
    },
    // 子元素的值
    defaultProps: {
      children: 'children',
      label: 'name'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 默认id
    id: {
      type: String,
      default: 'id'
    },
    // 默认父元素的在子元素里的id
    parentId: {
      type: String,
      default: 'parentId'
    }
  },
  data() {
    return {
      // 左侧选中数据
      leftSelect: [],
      // 右侧选中数据
      rightSelect: []
    }
  },
  computed: {
    // 左侧选中和没选中的比列
    treeLeftTatio() {
      return this.leftSelect.length + '/' + this.total
    },
    // 右侧选中和没选中的比列
    treeRightTatio() {
      return this.rightSelect.length + '/' + this.rightData.length
    },
    // 获取左侧数据总条数
    total() {
      let acount
      this.leftData.forEach((item) => {
        if (item.children) {
          acount += item.children.length
        }
      })
      return acount || this.leftData.length
    },
    // 左侧半选状态
    isLeftIndeterminate() {
      return this.leftSelect.length !== 0 && this.leftSelect.length < this.total
    },
    // 右侧半选状态
    isRightIndeterminate() {
      return this.rightSelect.length !== 0 && this.rightSelect.length < this.rightData.length
    },
    // 左侧全选状态
    checkedLeftAll: {
      get() {
        return this.leftSelect.length !== 0 && this.leftSelect.length === this.total
      },
      set() {
      }
    },
    // 右侧全选状态
    checkedRightAll: {
      get() {
        return this.rightSelect.length !== 0 && this.rightSelect.length === this.rightData.length
      },
      set() {
      }
    },
    // 右按钮
    toRightButton() {
      return this.leftSelect.length === 0
    },
    // 左按钮
    toLeftButton() {
      return this.rightSelect.length === 0
    }
  },
  methods: {
    // 移动到右边
    toRight() {
      const treeLeftSelectLeaf = this.$refs.treeLeft.getCheckedNodes(true)
      const keys = this.$refs.treeLeft.getCheckedKeys()
      this.$emit('update:rightData', JSON.parse(JSON.stringify([...this.rightData, ...treeLeftSelectLeaf])))
      this.removeSelect(this.leftData, keys)
      this.$refs.treeLeft.setCheckedNodes([])
      this.leftSelect = []
    },
    // 移动到左边
    toLeft() {
      const treeRightSelectLeaf = this.$refs.treeRight.getCheckedNodes()
      const keys = this.$refs.treeRight.getCheckedKeys()
      // 判断右边的叶子节点的父节点在左侧的数据中是否存在,在的话将数据过滤掉
      const data1 = JSON.parse(JSON.stringify(this.leftData))
      data1.forEach((item1) => {
        treeRightSelectLeaf.forEach((item2, index) => {
          if (item1[this.id] === item2[this.parentId]) {
            (item1[this.defaultProps.children]) || (item1[this.defaultProps.children] = [])
            item1[this.defaultProps.children].push(item2)
            treeRightSelectLeaf.splice(index, 1)
          }
        })
      })
      // 处理右边的叶子节点的父节点在左侧的数据中不存在的情况
      const data2 = []
      this.allData.forEach((item1) => {
        treeRightSelectLeaf.forEach((item2, index) => {
          if (item1[this.id] === item2[this.parentId]) {
            data2.push(JSON.parse(JSON.stringify(item1)))
          }
        })
      })
      this.$refs.treeRight.setCheckedNodes([])
      this.$refs.treeLeft.setCheckedNodes([])
      this.$emit('update:leftData', JSON.parse(JSON.stringify([...data2, ...data1])))
      this.removeSelect(this.rightData, keys)
      this.rightSelect = []
    },
    // 移除当前元素
    removeSelect(items, keys) {
      keys.forEach((key) => {
        items.forEach((item, index) => {
          if (item[this.id] === key) {
            items.splice(index, 1)
          }
          if (item.children && item.children.length > 0) {
            this.removeSelect(item.children, keys)
          }
        })
      })
    },
    /** 处理左侧事件资产树节点选中 */
    handleLeftAssetTreeCheckChange(obj, checked) {
      if (!obj.children) {
        // 如果没有子节点，为叶子节点，即指数节点
        if (checked) {
          // 如果选中状态 添加到右边
          this.leftSelect.push(obj)
        } else {
          // 如果非选中状态 从右边移除
          this.leftSelect = this.leftSelect.filter(asset => asset !== obj)
        }
      }
    },
    /** 处理右侧事件资产树节点选中 */
    handleRightAssetTreeCheckChange(obj, checked) {
      if (checked) {
        // 如果选中状态 添加到右边
        this.rightSelect.push(obj)
      } else {
        // 如果非选中状态 从右边移除
        this.rightSelect = this.rightSelect.filter(asset => asset !== obj)
      }
    },
    // 全选左侧指数资产树
    handleCheckLeftAllChange(checked) {
      if (checked) {
        this.$refs.treeLeft.setCheckedNodes(this.leftData)
      } else {
        this.$refs.treeLeft.setCheckedNodes([])
      }
    },
    // 全选右侧指数资产树
    handleCheckRightAllChange(checked) {
      if (checked) {
        this.$refs.treeRight.setCheckedNodes(this.rightData)
      } else {
        this.$refs.treeRight.setCheckedNodes([])
      }
    }
  }
}
</script>

<style scoped>

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

.treeBox {
  overflow: auto;
}

.penetrate {
  height: 442px;
  border-radius: 4px;
}

/* 树状 */
.modeSelect {
  float: left;
  width: 345px;
  /*height: 488px;*/
  border: 1px solid #dbdcdc;
  border-radius: 4px;
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
}

.treeTatio {
  float: right;
  padding-right: 18px;
}

.treeBox >>> .el-tree-node {
  padding: 5px 0 0 20px;
}

.treeBox {
  height: 446px;
}

.penetrate {
  float: left;
  width: 345px;
  height: 488px;
  border: 1px solid #dbdcdc;
}
</style>
<style lang="scss">
.transfer {
  .transferButtons {
    margin: 0 10px;
    width: 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

    .buttons {
      .buttonColor {
        border: 1px solid #dbdcdc;
        background-color: #fff;
      }

      .el-button {
        width: 36px;
        height: 36px;

        &:last-child {
          margin: 20px 0 0 0;
        }
      }
    }
  }
}
</style>
