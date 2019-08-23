import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // name选项作用  找到对应的路由规则
    // 跳转更方便一些，$router.push('/login')  $router.push({name:login})
    { path: '/login', name: 'login', component: Login }
  ]
})

export default router
