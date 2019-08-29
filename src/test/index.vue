<template>
  <div>
    <Aa>

     <div slot="so" slot-scope="scope">{{scope.msg}}</div>-->
    <!-- slot-scope="scope" 接受作用域插槽上所有绑定的数据 数据的集合叫做scope对象-->

    <template v-slot:so="scope">
          {{scope.msg}}
        <div slot="so1"></div>
        <div slot="so2"></div>
        <div slot="so3">4444</div>
        <div slot="so4">55555</div>
      </template>

    </Aa>

    <MyBread></MyBread>
  </div>
</template>

<script>
import Aa from './aa'
import MyBread from '@/components/my-bread'
export default {
  components: { Aa, MyBread }
}
</script>

<style lang="less" scoped>
</style>
