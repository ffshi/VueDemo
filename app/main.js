import Vue from 'vue'
import VueRouter from 'vue-router'  // vue-router路由
import RouterMap from './router.config'// 路由配置文件

Vue.use(VueRouter)

const App = Vue.extend({})

let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true,
  linkActiveClass: 'custom-active'
})

// 设置路由
RouterMap(router)

router.start(App, '#app')

