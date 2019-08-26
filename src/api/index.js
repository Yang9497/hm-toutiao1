// 配置一个符合项目需要的axios 导出去进行全局的配置
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 进行配置
// 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头  token
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`
// 添加请求拦截器
// use 在每次请求前都会调用
// 第一个函数 请求成功时候调用
// 第二个函数  拦截请求的 时候  做业务的时候  出现报错 才会触发 第二个函数的执行
axios.interceptors.request.use(config => {
  // 参数  config 请求配置  默认配置
  // 修改配置  添加token信息
  // 返回修改好的配置  请求的时候使用你的修改后的配置
  //   修改配置  加token
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => res, err => {
//    获取状态码
  const status = err.response.status
  //    判断是否401
  if (status === 401) {
    //  清除无效的token
    store.delUser()
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
