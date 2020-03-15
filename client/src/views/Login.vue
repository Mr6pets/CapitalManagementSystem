<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">AlvisLiu`s后台管理系统</span>
      </div>
      <!-- :model="registerUser" :rules="rules":验证规则 ref="registerForm"：获取表单内容-->
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        label-width="60px"
        class="loginForm"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>
            还没有账号？现在
            <router-link to="/register">注册</router-link>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>
<script>
//引入jwt_decode
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  components: {},
  data() {
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {
        //设定验证规则
        email: [
          {
            type: "email",
            required: true, //必填
            message: "邮箱格式不正确", //提示信息
            trigger: "blur" //失去焦点触发
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30位之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          // axios 发送请求
          this.$axios.post("/api/users/login", this.loginUser).then(res => {
            // console.log(res);
            //登录成功 拿到返回值的token
            //从返回值中结构token
            const { token } = res.data;
            //存储到localstorage 中
            localStorage.setItem("eleToken", token);
            //解析token
            const decoded = jwt_decode(token);
            // console.log(decoded);
            // 将解析的token存储到vuex中
            //调用dispatch分发执行vuex中的setAuthenticated函数，做判断 解析出来的token有值那么就是有授权的 那么传递过去的值就是true
            //但是判断为空的函数是 有值 会返回false 所以我们要取反
            this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
            this.$store.dispatch("setUser", decoded);
            //登录成功 路由跳转到页面
            this.$router.push("/index");
          });
        }
      });
    },
    //判断传递进来的value是否为空
    isEmpty(value) {
      //传递进来的是空值，返回 true；传递进来的值不为空，那就显示false
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.png) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
