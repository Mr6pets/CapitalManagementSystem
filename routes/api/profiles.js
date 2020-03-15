// 登录 注册接口
const express = require('express');
const router = express.Router();
//引用定义好的passport验证
const passport = require("passport");
//引入user的数据模型，用来查询数据库
const Profile = require('../../models/Profile')


//$route GET api/profiles/test
//@desc 返回请求的json数据
// @access public 公有接口（private：私有接口）
// router.get('/test', (req, res) => {
//   res.json({ msg: "profiles works" })
// });

//$route POST api/profiles/add
//@desc 创建信息接口
// @access private
router.post("/add", passport.authenticate('jwt', { session: false }), (req, res) => {
  //定义一个空的对象，用来存储我们添加进来的信息
  const profileFields = {};
  if (req.body.type) profileFields.type = req.body.type;
  if (req.body.describe) profileFields.describe = req.body.describe;
  if (req.body.income) profileFields.income = req.body.income;
  if (req.body.expend) profileFields.expend = req.body.expend;
  if (req.body.cash) profileFields.cash = req.body.cash;
  if (req.body.remark) profileFields.remark = req.body.remark;

  //用数据库自己的方法存存储数据，保存，成功了返回对应的数据
  new Profile(profileFields).save().then(profile => {
    res.json(profile)
  })

})

//$route GET api/profiles
//@desc 获取所有信息
// @access private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  //查询所有信息
  Profile.find().then((profile) => {
    if (!profile) {//没有信息就返回字符串提醒
      return res.status(400).json("没有任何内容")
    } else {
      res.json(profile);
    }
  }).catch(err => {
    res.status(400).json(err)
  })
})

//$route GET api/profiles/:id
//@desc 获取单个信息
// @access private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //查询所有信息
  Profile.findOne({ _id: req.params.id }).then((profile) => {
    if (!profile) {//没有信息就返回字符串提醒
      return res.status(400).json("没有任何内容")
    } else {
      res.json(profile);
    }
  }).catch(err => {
    res.status(400).json(err)
  })
})

//$route POST api/profiles/edit
//@desc 编辑信息接口
// @access private
router.post("/edit/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  //定义一个空的对象，用来存储我们添加进来的信息
  const profileFields = {};
  if (req.body.type) profileFields.type = req.body.type;
  if (req.body.describe) profileFields.describe = req.body.describe;
  if (req.body.income) profileFields.income = req.body.income;
  if (req.body.expend) profileFields.expend = req.body.expend;
  if (req.body.cash) profileFields.cash = req.body.cash;
  if (req.body.remark) profileFields.remark = req.body.remark;

  //数据库更新
  Profile.findOneAndUpdate(
    { _id: req.params.id },
    { $set: profileFields },
    { new: true }
  ).then(profile => {
    res.json(profile)
  })
})

//$route POST api/profiles/delete/:id
//@desc 删除信息接口
// @access private
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
      .then(profile => {
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json('删除失败!'));
  }
);

module.exports = router;//将router供出
