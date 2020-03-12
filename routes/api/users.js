// 登录 注册接口
const express = require('express');
const router = express.Router();

//引入bcrypt，用来密码加密
const bcrypt = require('bcrypt');

//引入user的数据模型，用来查询数据库
const User = require('../../models/User')

//$route GET api/users/test
//@desc 返回请求的json数据
//@access public 公有接口（private：私有接口）
router.get('/test', (req, res) => {
  res.json({ msg: "user test works" })
})

//$route POST api/users/register
//@desc 返回请求的json数据
//@access public 公共接口
router.post("/register", (req, res) => {
  console.log(req.body)
  // 注册的时候的流程
  //查询数据库 是否有前端发送过来的这个数据信息
  // User.findOne({ email: req.body.email })
  //   .then((user) => {
  //     if (user) {
  //       return res.status(400).json({ email: "邮箱被注册了" })
  //     } else {
  //       //如果邮箱没有被注册，那就注册邮箱 在我们创建的模型中
  //       const newUser = new User({
  //         name: req.body.name,
  //         email: req.body.email,
  //         avatar,
  //         password: req.body.password
  //         // identity: req.body.identity
  //       });

  //       //密码存储不能用明文，用bcrypt来密码加密
  //       // bcrypt.genSalt(saltRounds,function (err, salt) {
  //       // bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {//myPlaintextPassword:指定加密的数据
  //       //   // Store hash in your password DB.
  //       // });
  //       // }) saltRounds 加密强度 
  //       bcrypt.genSalt(10, (err, salt) => {
  //         bcrypt.hash(newUser.password, salt, function (err, hash) {
  //           // hash 加密前端传递过来密码 调用salt函数  回调函数 中的hash就是加密过后的数据
  //           if (err) throw err;
  //           newUser.password = hash;//将加密过后的数据复制给newUser下的password
  //           //调用存储方法save();
  //           newUser.save()
  //             .then(user => res.json(user))
  //             .catch(err => console.log(err))
  //         });
  //       });

  //     }
  //   })
})



module.exports = router;//将router供出
