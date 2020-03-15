//存储数据模型
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  identity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
//说明下mongoose.model("users", UserSchema) model（参数1，参数二）
//mongoose.model(`文档名称`, Schema)
//使用model()方法，将Schema编译为Model。model()方法的第一个参数是模型名称
// 注意 一定要将model()方法的第一个参数和其返回值设置为相同的值，否则会出现不可预知的结果
module.exports = User = mongoose.model("users", UserSchema);



