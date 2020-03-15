// 登录 注册接口
const express = require('express');
const router = express.Router();
//引入bcrypt，用来密码加密
const bcrypt = require('bcrypt');
//引入jsonwebtoken
const jwt = require('jsonwebtoken');
//引入gravatar 全球公用头像
const gravatar = require('gravatar');
const keys = require('../../config/keys')
//引用定义好的passport验证
const passport = require("passport");

//引入user的数据模型，用来查询数据库
const User = require('../../models/User')


//$route GET api/users/test
//@desc 返回请求的json数据
//@access public 公有接口（private：私有接口）
// router.get('/test', (req, res) => {
//   res.json({ msg: "user test works" })
// });

//$route POST api/users/register
//@desc 返回请求的json数据
//@access public 公共接口
router.post('/register', (req, res) => {
  // console.log(req.body);
  // 注册的时候的流程
  //查询数据库 是否有前端发送过来的这个数据信息
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json("邮箱被注册了")
      } else {
        //如果邮箱没有被注册，那就注册邮箱 在我们创建的模型中
        //使用全球公认头像
        const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
          identity: req.body.identity
        });

        //密码存储不能用明文，用bcrypt来密码加密
        // bcrypt.genSalt(saltRounds,function (err, salt) {
        // bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {//myPlaintextPassword:指定加密的数据
        //   // Store hash in your password DB.
        // });
        // }) saltRounds 加密强度 
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            // hash 加密前端传递过来密码 调用salt函数  回调函数 中的hash就是加密过后的数据
            if (err) throw err;
            newUser.password = hash;//将加密过后的数据复制给newUser下的password
            //调用存储方法save();
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        });

      }
    })
});

//$route POST api/users/login
//@desc 返回token 
//@access public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //查询数据库，看看email在数据库是否存在，存在验证密码
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).json("用户不存在!")
    } else {//存在这样的用户开始做密码匹配，
      // 使用bcrypt 的compare
      //compare(前端传递过来的密码，后端数据库里面的密码)
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {//如果登录成功了，那就使用jwt生成token
          //jwt.sign(规则, 加密名字：通常是secret,"过期时间"，"箭头函数");
          //制定规则：
          const rule = { id: user.id, name: user.name, avatar: user.avatar, identity: user.identity };
          jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err
            res.json({
              success: true,
              token: "Bearer " + token
            })
          });
        } else {
          return res.status(400).json("密码错误");
        }
      })

    }
  })
})

//$route GET api/users/current
//@desc 放回当前的用户信息
//@access private
// router.get("/current",验证token，箭头函数)

//这个接口是请求用户信息的
// 思路：用server.js中的passport模块 passport-jwt配置信息， 最后通过passport的authenticate方法以jwt的验证方式 {session:false}来验证

router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
  // res.json(req.user)
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  })
})

module.exports = router;//将router供出
