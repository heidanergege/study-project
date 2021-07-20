import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 公共的数据中心
  state: {
    count: 0
  },
  // 要处理 state 中的数据 只能在 mutations 中完成
  mutations: {
    add (state) {
      state.count++
    },
    sub (state) {
      state.count--
    },
    addN (state, step) {
      state.count += step
    },
    subN (state, step) {
      state.count -= step
    }
  },
  // action 是负责用异步的方法 可以通过mutations中的方法来 异步处理 state中的数据的
  actions: {
    addAsync (context) {
      setTimeout(() => {
        // commit('') 语法是调用 mutations 中的函数
        context.commit('add')
      }, 1000)
    },
    addAsyncN (context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 2000)
    },
    subAsync (context) {
      setTimeout(() => {
        context.commit('sub')
      }, 2000)
    },
    subAsyncN (context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 2000)
    }
  },
  modules: {},
  // gitters 只是对state 中的数据 起到一个包装的作用，并不会修改原数据，和computed 计算属性相似
  getters: {
    showNum (state) {
      return '当前最新的数值是【' + state.count + '】'
    }
  }
})
