<template>
    <div>
        {{msg+da}}
    </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  created () {
    // 谁需要数据 谁就绑定事件
    eventBus.$on('hong', (data) => {
      this.da = data
    })
  },
  data () {
    return {
      msg: '佛说',
      da: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
