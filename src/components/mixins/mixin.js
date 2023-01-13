const mixin = {
    data() {
      return {
        msg: "hello"
      }
    },
    methods: {
      mixinMethod() {
        this.msg = this.msg + ',这是mixin混入方法'
        console.log(this.msg + ',这是mixin混入方法')
      }
    }
  }
  export default mixin;
  