<template>
  <div class="content">
    <el-row>
      <el-col :span="24">computed计算属性的使用</el-col>
      <el-col :span="24">Original message: "{{ message }}"</el-col>
      <el-col :span="24">
        Computed reversed message: "{{ reversedMessage }}"
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">mixins混入的使用</el-col>
      <el-col :span="24">
        <el-button @click="getButton">mixins</el-button>
      </el-col>
      <el-col :span="24">{{ msg }}</el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">filters混入的使用</el-col>
      <el-col :span="24">{{ f | getFilters }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        {{ getTree }}
      </el-col>
    </el-row>
  </div>
</template>
<script>
import mixin from '../components/mixins/mixin'
export default {
  mixins: [mixin],
  components: {},
  data() {
    return {
      message: 'Hello',
      f: 'filters',
      treeData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
    }
  },
  computed: {
    reversedMessage: function () {
      return this.message + '元'
    },
    getTree(){
      this.treeData.forEach(item => {
        return item.id
      })
    },
  },
  filters: {
    getFilters(val) {
      return val + '的使用'
    },
  },
  created() {},
  methods: {
    getButton() {
      this.mixinMethod()
    },
  },
}
</script>
<style>
</style>