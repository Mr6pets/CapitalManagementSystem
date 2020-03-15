//用来做请求
import axios from 'axios';
import router from './router/index'
//Loading 还可以以服务的方式调用。引入 Loading 服务：
import { Message, Loading } from 'element-ui';

let loading;//定义一个变量
function startLoading() {
  // 在需要调用时：startLoading将loading.service赋值给loading 
  //Loading.service(options); option设定的对象
  loading = Loading.service({
    lock: true,//是否锁定中
    text: "拼命加载中...",
    background: 'rgba(0,0,0,0.7)'
  });
}

//结束一个动画
function endLoading() {
  loading.close();
}


//请求拦截
axios.interceptors.request.use(config => {
  //加载动画的时候
  startLoading();

  //请求拦截的时候查找本地是否有登录的token信息
  if (localStorage.eleToken) {
    //设置统一的请求header
    config.headers.Authorization = localStorage.eleToken;
  }
  //成功return config
  return config;
}, error => {
  return Promise.reject(error);
});


//响应拦截
axios.interceptors.response.use(response => {
  //结束加载动画
  endLoading();
  return response;
}, error => {
  //错误提醒
  endLoading();//结束加载动画
  Message.error(error, response.data);
  //如果响应的有错误, 状态码401那就是token失效了
  //获取错误状态码
  const { status } = error.response;
  if (status == 401) {
    Message.error("token失效，请重新登录");
    //清除token
    localStorage.removeItem('eleToken');
    //路由到登录页面
    router.push('/login');
  }

  return Promise.reject(error)
})

export default axios;



