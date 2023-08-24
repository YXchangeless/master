<template>
  <el-select
    v-model="selectValue"
    class="elSelect"
    :multiple="isMulti"
    collapse-tags
    :filterable="isFilter"
    placeholder="请选择"
    popper-class="elSelectDropdown "
    @change="change"
    @remove-tag="removeTag"
    @visible-change="visibleChange"
  >
    <el-option
      v-for="item in options"
      :key="item[value]"
      :label="item[label]"
      :value="item[value]"
    >
    </el-option>
    <li style="height:34px"></li>
    <div class="selectBtn">
      <el-button size="mini" @click="deselectAll">取消全选</el-button>
      <el-button size="mini" style="width:50px" @click="setSelectAll">全选</el-button>
    </div>
  </el-select>
</template>

<script>
export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: 'value'
    },
    label: {
      type: String,
      default: 'label'
    },
    isMulti: {
      type: Boolean,
      default: true
    },
    isFilter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectValue: []
    }
  },
  methods: {
    setValue(val) {
      this.selectValue = val
    },
    setSelectAll() {
      this.selectValue = this.options.map((item) => {
        return item[this.value]
      })
      this.$emit('visibleChange', this.selectValue)
    },
    deselectAll() {
      this.selectValue = []
    },
    change(val) {
      this.selectValue = val
      this.$emit('change', this.selectValue)
    },
    visibleChange(val) {
      if (!val) {
        this.$emit('visibleChange', this.selectValue)
      }
    },
    removeTag() {
      this.$emit('visibleChange', this.selectValue)
    },
    reset() {
      this.selectValue = []
      this.$emit('visibleChange', this.selectValue)
    }
  }
}
</script>

<style scoped>

</style>
<style lang="scss">
.elSelect {
  .el-select__tags {
    flex-wrap: nowrap;
    overflow: hidden;
  }

  .el-select__tags-text {
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-tag .el-icon-close {
    margin-bottom: 8px;
  }
}

.elSelectDropdown {

  .selectBtn {
    position: absolute;
    bottom: 0;
    left: 0px;
    width: 100%;
    height: 40px;
    border-top: 1px solid #dbdcdc;
    display: flex;
    padding: 6px 10px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;

    button {
      font-size: 14px;
      height: 28px;
    }
  }
}
</style>
