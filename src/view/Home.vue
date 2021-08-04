<template>
  <div>
    <!-- <Add></Add> -->
    <!-- <Sub></Sub> -->
    <Table :tableData="tableData" @ss="getss">
      <template slot="header">
        <el-row style="padding: 10px 0;">
          <el-col :span="6">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="ss">查询</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </template>
    </Table>
  </div>
</template>

<script>
  import Input from '../components/input.vue'
  // import Add from '../components/add.vue'
  // import Add from '@/components/add.vue'
  import Sub from '../components/sub.vue'
  import Table from '../components/table.vue'
  export default {
    name: "demo",
    components: {
      Input,
      // Add,
      Sub,
      Table
    },
    data() {
      return {
        name: 'sssss',
        button: [1, 2, 3],
        tableData: [],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      };
    },
    created() {},
    mounted() {
      this.ss();
    },
    methods: {
      getss(a,b) {
        console.log(a,b);
      },
      getVal(a,b) {
        console.log(a,b);
      },
      ss() {
        this.tableData = [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      },
    },
  };
</script>
<style scoped>
</style>