export default {
  props: {
    // 当前操作模块
    currOperation: {
      type: String,
      required: true,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['new', 'view', 'edit', 'copy'].indexOf(value) !== -1
      }
    }
  }
}
