// 登录 注册接口
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ msg: "user logoning works" })
})

