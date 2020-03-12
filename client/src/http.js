//用来做请求
import axios from 'axios';

//Loading 还可以以服务的方式调用。引入 Loading 服务：
import { Message, Loading } from 'element-ui';

let loading;//定义一个变量
function startLoading() {
  // 在需要调用时：startLoading将loading.service赋值给loading 
  //Loading.service(options); option设定的对象
  loading = Loading.service({
    lock: true,
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
  return Promise.reject(error)
})

export default axios;



