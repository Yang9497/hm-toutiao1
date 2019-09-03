<template>
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>

</template>

<script>
export default {
  name: 'my-channels',
  props: ['value'],
  created () {
    this.getChannelOptions()
  },
  data () {
    return {
      channelOptions: []
    }
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    changeChannel (chaneleId) {
      if (chaneleId === '') chaneleId = null
      this.$emit('input', chaneleId)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
