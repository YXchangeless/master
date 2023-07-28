<template>
  <div class="content">
    
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