<template>
    <div>
        <el-input v-model="input" :placeholder="placeholder"></el-input>

    </div>
</template>
<script>
export default {
    data() {
    return {
        input:'',
        placeholder: '请输入内容',
    }
  },
  created() {
      if(this.input == '') {
          this.placeholder = ''
      }
  },
  methods: {

  }

}
</script>
<style>

</style>