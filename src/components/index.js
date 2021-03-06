// 封装一个插件  目的全局注册components 下面的所有组件
import MyBread from './my-bread'
import MyChannels from './my-channels'
import MyImage from './my-image'
export default {
  install (Vue) {
    // vue 对象  Main.js 中使用Vue.use() 调用install函数 传入当前的Vue对象
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannels.name, MyChannels)
    Vue.component(MyImage.name, MyImage)
  }
}
