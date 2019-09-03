<template>
    <div>
        <p>{{msg}}的{{value}}已经饥渴难耐</p>

    </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      msg: '某',
      val: '斩首'
    }
  },
  created () {
    this.$emit('input', this.val)
    // 触发自定义事件  在子组件内部触发  this.$emit('事件名',子所传值)
  }
}
</script>

<style lang="less" scoped>
</style>
