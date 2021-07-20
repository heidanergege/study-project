import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    addId: 5,
    viewkey: 'all'
  },
  mutations: {
    // 初始数据
    initList (state, list) {
      state.list = list
    },
    // 将用户输入的数据进行回绑
    setInputValue (state, data) {
      state.inputValue = data
    },
    // 添加数据
    addList (state) {
      const addObj = {
        id: state.addId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(addObj)
      state.addId++
      state.inputValue = ''
    },
    removeItem (state, id) {
      // 用查找索引的方法 找出对应id的数据的索引号
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引号删除数据
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 改变复选框的状态
    checkboxStatus (state, param) {
      const i = state.list.findIndex(e => e.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.done
      }
    },
    clearDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeBtnStatus (state, key) {
      state.viewkey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneNum (state) {
      return state.list.filter(x => x.done === false).length
    },
    showList (state) {
      if (state.viewkey === 'all') {
        return state.list
      }
      if (state.viewkey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewkey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  }
})
