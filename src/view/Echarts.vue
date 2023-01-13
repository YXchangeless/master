<template>
  <div class="main">
    <el-row>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-row>
    <el-row>
      <el-button @click="sd()">新增</el-button>
    </el-row>
    <el-row v-for="(item,index) in inputArr" :key="index">
      <span v-show="!show">{{item.name}}</span>
      <el-input v-model="input2" placeholder="请输入内容" v-show="item.sta"></el-input>
      <el-button @click="updata(index)">修改</el-button>
      <el-button @click="del(index)" v-show="!show">删除</el-button>
      <el-button @click="save(index)" v-show="show">保存</el-button>
      </el-row>
  </div>
</template>
<script>
import "../../Mock/mock.js"
import axios from "axios"
export default {
  data() {
    return {
      input: '',
      input2: '',
      show: false,
      inputArr:[],
    }
  },
  methods: {
    sd(){
      console.log(11111)
          axios.post("http://localhost:8080/goods/goodAll").then((res)=>{
            console.log(res)
        })
    },
    add(){
      if(this.input == '') {
        this.$message.warning('不能为空');
      } else {
        this.inputArr.push({name: this.input,sta: false})
        this.input = ''
      }
    },
    updata(index) {
      this.inputArr[index].sta = true
      this.input2 = this.inputArr[index].name
      console.log(this.inputArr[index].name)
    },
    save(index){
      console.log(this.inputArr[index].name)
      console.log(this.input2)
      this.inputArr[index].name = this.input2
      this.show = false
      
    },
    del(index) {
      console.log(index+1)
      let newArr = []
      newArr = this.inputArr.slice(index + 1)
      console.log(newArr)
      this.inputArr = newArr
    },
  },
}
</script>
<style scoped>
</style>