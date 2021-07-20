import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
// 导入element ui
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入vue-table-with-tree 插件 依赖项
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器依赖
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

// 导入 NProgress 包对应的JS和css
// import NProgress from 'nprogress'
// import 'nprogress.css '

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置请求拦截器，并添加token，以保证拥有获取数据的权限

axios.interceptors.request.use(config => {
  // 在 request 拦截器中，展示进度条 NProgress.start()
  // NProgress.start()

  // 为请求头对象，添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 固定的语法格式 必须要 return config
  return config
})

// 在 response 拦截器中， 隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  // NProgress.done()
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

// 就富文本编辑器注册为可用的全局组件
Vue.use(VueQuillEditor)

// 定义一个全局的时间的过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, 0)
  const d = (dt.getDate() + '').padStart(2, 0)

  const hh = (dt.getHours() + '').padStart(2, 0)
  const mm = (dt.getMinutes() + '').padStart(2, 0)
  const ss = (dt.getSeconds() + '').padStart(2, 0)

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
