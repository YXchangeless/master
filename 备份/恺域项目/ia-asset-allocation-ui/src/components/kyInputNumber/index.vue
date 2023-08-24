<template>
  <el-input-number
    v-model="defaultValue"
    v-bind="$attrs"
    v-on="$listeners"
    :max="max"
    :min="min"
    :precision="precision"
    :size="large"
    :disabled="disabled"
    :controls="controls"
  ></el-input-number>
</template>

<script>
export default {
  name: 'kyInputNumber',
  props: {
    value: {
      type: [Number, String],
      // eslint-disable-next-line vue/require-valid-default-prop
      default: undefined
    }, max: {
      type: Number,
      default: 100
    }, min: {
      type: Number,
      default: 0
    }, large: {
      type: String,
      default: 'large'
    },
    precision: {
      type: Number,
      default: 2
    },
    controls: {
      type: Boolean,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.defaultValue = newValue
      }
    }
  },
  data() {
    return { defaultValue: undefined }
  }
}
</script>
<style scoped>

</style>
