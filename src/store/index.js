import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUerInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存token字符串
    token: '',
    userInfo: {}
  },
  getters: {
    nickname: (state) => state.userInfo.nickname,
    username: (state) => state.userInfo.username,
    user_pic: (state) => state.userInfo.user_pic
  },
  mutations: {
    // 保存token
    // updateToken(state, val) {
    //   state.token = val
    // },
    // 更新token的mutation函数
    updateToken(state, newToken) {
      state.token = newToken
    },
    // 更新用户的信息
    updateUserInfo(state, info) {
      state.userInfo = info
    }
  },
  actions: {
    // 定义初始化用户基本信息的action函数
    async initUserInfo(store) {
      const { data: res } = await getUerInfoAPI()
      if (res.code === 0) {
        store.commit('updateUserInfo', res.data)
      }
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})
