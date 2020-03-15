// 这里是路由的管理
import Vue from 'vue'
import VueRouter from 'vue-router'

//引入views文件夹中的index.vue的文件
import Index from "../views/index.vue"
import NotFound from "../views/404.vue"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
import Infoshow from "../views/Infoshow.vue"
import FundList from "../views/FundList.vue"
Vue.use(VueRouter)

const routes = [
  { path: '*', name: 'notFound', component: NotFound },
  { path: '/', redirect: '/index' },
  {
    path: '/index', name: 'index', component: Index, children: [
      { path: "", component: Home },
      { path: "/home", name: "home", component: Home },
      { path: "/infoshow", name: "infoshow", component: Infoshow },
      { path: "/fundlist", name: "fundlist", component: FundList }
    ]
  },
  { path: '/register', name: 'register', component: Register },
  { path: '/login', name: 'login', component: Login }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由守卫
router.beforeEach((to, from, next) => {
  // 守卫判断的条件是 这个local中是否有token
  const isLogin = localStorage.eleToken ? true : false;
  // 路径是登录或者注册 直接访问 不设限制
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    //如果访问别的路径，本地的存储是没有token的 那就都到登录页面 如果有那就直接执行
    isLogin ? next() : next("/login");
  }
})

export default router
