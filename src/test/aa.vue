<template>
    <div>
        <div>di</div>
        <slot></slot>
        <!-- 封装组件 默认接受使用组件使用内容 -->
        <slot >三昧真火</slot>

        <!--  封装组件  使用组件的时候没有传入内容  使用slot中的默认内容-->
        <slot name="so2">三昧真火</slot>
        <!-- 封装组件  有名字的插槽 -->
        <slot name="so3">三昧真火</slot>
        <slot name="so" list="数组" :msg="magess" ></slot>
         <!-- 作用域插槽  使用组件的时候  需要使用组件内部的数据  -->
        <slot name="so4">三昧真火</slot>
        <div>di</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      magess: '加油'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
