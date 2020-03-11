// 这里是路由的管理
import Vue from 'vue'
import VueRouter from 'vue-router'

//引入views文件夹中的index.vue的文件
import Index from "../views/index.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
