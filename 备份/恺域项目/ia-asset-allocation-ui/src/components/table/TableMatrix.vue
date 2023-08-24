<template>
  <!-- <div>相关性矩阵图： -->
  <div class="table matrix">
    <el-table
      :data="matrixTabledata"
      style="width: 100%"
      :cell-style="columnStyle"
    >
      <!--   无数据时加载图片   -->
      <template slot="empty" style="border:1px solid #000">
        <img src="../../assets/Images/nodata.png" alt="">
      </template>
      <!--  end 无数据时加载图片   -->
      <el-table-column
        v-for="(item, index) in headerList"
        :key="index"
        header-align="center"
        :prop="item.code"
        :label="item.name"
        :width="item.width"
      />
    </el-table>
  </div>
  <!-- end <div>相关性矩阵图： -->
</template>
<script>
export default {
  name: 'Matrix',
  props: {
    // table内容
    matrixTabledata: {
      type: Array,
      default: () => []
    },
    // table表头
    headerList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    // 表格颜色
    columnStyle({ columnIndex }) {
      if (columnIndex === 0) {
        // 第三第四列的背景色就改变了2和3都是列数的下标
        return `text-align:left`
      } else {
        return `text-align:right`
      }
    }
  }
}
</script>
<style lang="scss">
.matrix {
  .el-table {
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>
