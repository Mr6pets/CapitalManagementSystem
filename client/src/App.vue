<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
//引入jwt_decode
import jwt_decode from "jwt-decode";
export default {
  name: "app",
  components: {},
  created() {
    if (localStorage.eleToken) {
      //根目录下 判断是否有localStorage，如果存储到vuex中
      const decoded = jwt_decode(localStorage.eleToken);
      // 将解析的token存储到vuex中
      //调用dispatch分发执行vuex中的setAuthenticated函数，做判断 解析出来的token有值那么就是有授权的 那么传递过去的值就是true
      //但是判断为空的函数是 有值 会返回false 所以我们要取反
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
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
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
