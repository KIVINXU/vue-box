import Vue from 'vue'
import Router from 'vue-router'

import Starter from './views/starter.vue'
import Out from './views/out.vue'
import Store from './views/store.vue'
import Error from './views/errorInfo.vue'

Vue.use(Router);
export const routes = [
  {
    path: '/',
    name: '主页',
    component: Starter
  },
  {
    path: '/store',
    name: '存',
    component: Store
  },
  {
    path: '/open',
    name: '取',
    component: Out
  },
  {
    path: '/error',
    name: '无法打开',
    component: Error
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
