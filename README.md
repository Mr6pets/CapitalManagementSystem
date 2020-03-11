# CapitalManagementSystem
这是一个简单的资金管理后台，采用Vuecli3+node.js+element的这几种框架。

这是一个学习测试的资金管理系统的后台，采用了Vue cli3 nodejs element  mangoDB线上数据库的一个单元测试。

吭哧吭哧埋头写代码是不行的 ，还是要学会思考记录滴！！

滴 滴滴 开车：

前端文件放置在client文件夹中记录一些步骤，辅助这些年还算聪明的大脑

~~~js
创建：
vue create client
之后选择基本的 babel route vuex 等 其他需要再npm install安装就好了

之后就是
cd client
npm run serve

~~~

ps:

~~~js
前后端连载：
npm install concurrently

在前端clinetz中的package.json里做配置：
"script":{
  "start":"npm run serve"//前端配置的启动
}
在后端的package.json中做配置：
"script":{
  "client-install":"npm install --prefix client",//这个的意思是 当启动的时候要装前端的client的依赖模块
    "client":"npm start --prefix client",//这个意思是 npm 启动前端定义的start的模块 指明路径是prefix clinet
    "dev":"concurrently \"npm run server\"npm run client\" "//前后端连载：通过concurrent来进行绑定 后端的启动是 npm run server 前端的启动是 npm run client
}
最后通过npm run dev 启动前后端连载

~~~



#####	这里采用element 饿了么的前端框架

~~~js
前端页面client中添加 (脚手架安转饿了么组件)
npm i element-ui -S
~~~

