<template>
  <div>
    <!-- <el-input placeholder="请输入内容" v-model="name"> -->
    <el-row>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="name"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button>{{button[1]}}</el-button>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
  export default {
    name: "demo",
    props: {
      name: {
        type: String,
        default: ''
      },
      button: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        input: '12313',
        num: 1
      };
    },
    mounted() { },
    methods: {},
  };
</script>
<style scoped>
</style>