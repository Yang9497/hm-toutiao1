import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
// import axios from 'axios'
import '@/styles/index.css'
import axios from '@/api'

import myPlugin from '@/components'
Vue.use(myPlugin)
Vue.use(ElementUi)
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
