// 负责用户数据的 存储  删除  获取三个函数
const KEY = 'heima-toutiao-1'
export default {
  setUser (user) {
    // 存储用户信息  user 数据类型   对象
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    //   获取用户信息
    const jsonStr = window.sessionStorage.getItem(KEY) || '{}'
    // 可能没有数据  返回的null null.token 会报错  但是 {}.token 的值为undefined
    return JSON.parse(jsonStr)
  },
  delUser () {
    // 删除用户信息
    window.sessionStorage.removeItem(KEY)
  }
}
