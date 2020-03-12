import Vue from 'vue'
import App from './App.vue'
//引入请求
import axios from './http';
//引入饿了么模块的组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'
import store from './store'

Vue.config.productionTip = false
//使用element
Vue.use(ElementUI);
//axios挂载到全局属性上
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
