<template>
    <div>
      <button @click="up">
        传递 {{sha}}
      </button>

    </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {

  data () {
    return {
      sha: '傻狗'
    }
  },
  methods: {
    up () {
      eventBus.$emit('hong', this.sha)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
