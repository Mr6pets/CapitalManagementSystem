const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const app = express();

//登录注册 路由引入
const users = require('./routes/api/users');
//内容信息 路由引入
const profiles = require('./routes/api/profiles');

//mongoDB的配置
const db = require('./config/keys').mongodbURI;

//boy-parser的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



mongoose.connect(db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("mongoDb connected...")
  })

  .catch((err) => {
    console.log(err);
  })

//passport初始化
app.use(passport.initialize());
//引入的passport文件将上面的passport模块传过去
require("./config/passport")(passport);

//设置路由
// app.get("/", (req, res) => {
//   res.send("hello")
// })

//使用中间件，使用routes
app.use("/api/users", users);//这个意思就是说 当我们访问/api/users的时候就会找到 users
app.use("/api/profiles", profiles);//这个意思就是说 当我们访问/api/profiles的时候就会找到 上面引入的profiles的路由内容

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
})

