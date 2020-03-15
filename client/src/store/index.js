import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// state:存放数据地方，这些数据外部组价什么的都是可以直接调用的
//getters:获取数据 对state操作的方法
// mutations 像一个事件注册 触发事件
// actions 提交的是mutation 不是直接的变更状态 action可以包含任意异步操作

//type更好的在devtool工具上显示，方便调试

const types = {//会在浏览器上显示
  SET_AUTHENTICATED: "SET_AUTHENTICATED",//表示是否认证通过  
  SET_USER: 'SET_USER'//配置用户
}
const state = {
  // 状态设置
  isAuthenticated: false,//默认情况下是没有授权
  user: {}//将解析后的用户信息存储到这里
}
const getters = {
  //获取state里面的授权和用户信息
  isAuthenticated: state => state.isAuthenticated,
  user: user => state.user
}
const mutations = {
  //这个类似是取types里面的SET_AUTHENTICATED
  //形成了一种 **(){}某某函数的感觉 传递2个参数 一个是状态 一个是 是否授权
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated) {//如果说外面传递过来的授权是真 那就将出传递过来的授权赋值给state里面授权
      state.isAuthenticated = isAuthenticated
    } else {
      state.isAuthenticated = false;
    }
  },
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user
    } else {
      state.user = {}
    }
  }
}
const actions = {
  //-----------------------------------

  // 案例示范

  // actions 中调用mutations中的函数
  //payload 接收来自页面的的参数用payload接收
  // reducePrice: (context, payload) => {
  //   setTimeout(() => {
  //     //这里的context相当与this.$store,action中相当于用context激活mutations中的函数
  //     context.commit("reducePrice", payload)
  //   }, 3000);
  // }
  //-----------------------------------

  // 可以异步操作的mutations的actions
  //  设置是否授权 commit 是外部调用dispatch分发的时候回调用的函数
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  //清除当前的状态
  clearCurrentState: ({ commit }) => {
    //授权清除  用户清除
    commit(types.SET_AUTHENTICATED, false);
    commit(types.SET_USER, null)
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
