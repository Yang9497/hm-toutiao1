import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Notfound from '@/views/notfound'
import store from '../store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // name选项作用  找到对应的路由规则
    // 跳转更方便一些，$router.push('/login')  $router.push({name:login})
    { path: '/login', name: 'login', component: Login },
    { path: '/',

      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ] },
    { path: '*', name: '404', component: Notfound }

  ]
})

router.beforeEach((to, from, next) => {
  // 去的路径是登录的  放行
  // if (to.path === '/login') return next()
  // // 不是登录的时候 且没有登录  拦截  跳转到登录界面
  // if (!store.getUser().token) return next('/login')
  // // 其他情况   放行
  // next()
  if (!store.getUser().token && to.path !== '/login') return next('/login')
  next()
})

export default router
