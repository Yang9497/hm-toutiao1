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
    <hr>
     <son @input="fn" value="苗刀"></son>
     <!-- 1使用子组件绑定自定义事件 -->{{val}}
     <hr>
     <comA></comA>
     <hr>
     <comB></comB>
  </div>

</template>

<script>
import Aa from './aa'
import MyBread from '@/components/my-bread'
import Son from './son'
import comA from './com-a'
import comB from './com-b'
export default {
  components: { Aa, MyBread, Son, comA, comB },
  created () {
    // console.log(Son)
    // 在父组件  实现 fn 函数

  },
  data () {
    return {
      result: '钩子',
      val: ''
    }
  },
  methods: {
    fn (data) {
      this.val = data
    }
  }

}
</script>

<style lang="less" scoped>
</style>
