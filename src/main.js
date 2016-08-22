import Vue from 'vue';
import VueRouter from 'vue-router';  // vue-router路由
import RouterMap from './router.config';// 路由配置文件
import filters from './filters';
import VueResource from 'vue-resource';
import vueBase from './base';
// import utils from  './libs/utils';

Vue.config.debug = true;

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(vueBase)
//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

//实例化VueRouter
let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true,
  linkActiveClass: 'custom-active'
});

let App = Vue.extend({});
// 设置路由
RouterMap(router);

router.start(App, 'body');
