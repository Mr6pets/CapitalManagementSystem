// jsonwebtoken的一种验证方式,passport-jwt
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
//引入mongoose中的users的这个表
const User = mongoose.model("users");
//引入这个主要是拿里面的secret的这个值
const keys = require('../config/keys');


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

//以上是passport-jwt 配置的一些信息
//下面依旧可以用passport来验证
module.exports = passport => {
  //passport 就是传递过来的安转模块
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log(jwt_payload);//这里通过给了授权token后 就可以拿到用户id 名字 创建时间等
    //数据库中查询
    User.findById(jwt_payload.id).then(user => {
      if (user) {//如果查到了，那就将user通过done回调传递
        return done(null, user)
      } else {//查不到那就false
        return done(null, false)
      }
    }).catch(err => {
      console.log(err)
    })
  }))

}