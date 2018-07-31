import Vue from 'vue'
import { Button, Header, Actionsheet, Field } from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式


Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Field.name, Field);

router.beforeEach((to, from, next) => {
  NProgress.start();
  setTimeout(() => {
    next();
  }, 500);
  NProgress.done();
});
router.afterEach(() => {
  NProgress.done() // 结束Progress
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
