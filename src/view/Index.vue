<template>
  <div class="main">
      <el-button @click="getAxios">axios发送请求</el-button>
      <el-button @click="getReq">发送请求</el-button>
      <el-button @click="getTest">封装请求</el-button>
      <el-button @click="getMock">mock</el-button>
  </div>
</template>
<script>
import axios from 'axios'
// import mock from'../api/mock.js'
export default {
  data() {
    return {}
  },
  // 实例完全被创建出来之前
  beforeCreate() {},
  created() {
  },
  beforeMount() {},

  mounted() {},
  methods: {
      getAxios(){
        axios.get('http://jsonplaceholder.typicode.com/posts')
      },
      getReq() {
        this.$request('/posts')
      },
      getTest(){
          this.$api.test.getNews().then(res=> {
              console.log(res)
          })
      },
      getMock(){
       console.log(this.$api.mock.getList())
      },
  },
}
</script>
<style scoped>
</style>