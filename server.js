const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//登录注册 路由引入
const users = require('./routes/api/users.js');

//使用中间件，使用routes
app.use("/api/users", users);//这个意思就是说 当我们访问/api/users的时候就会找到 users

//boy-parser的中间件
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.json())

//mongoDB的配置
const db = require('./config/keys').mongodbURI;
mongoose.connect(db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => {
    console.log("mongoDb connected...")
  })

  .catch((err) => {
    console.log(err);
  })
//设置路由
app.get("/", (req, res) => {
  res.send("hello")
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
})

