import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入element及样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入树形表格
import TreeTable from 'vue-table-with-tree-grid'

// 请求加载动画
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'

import Timeline from './components/plugins/timeline/index.js'
import TimelineItem from './components/plugins/timeline-item/index.js'
Vue.use(Timeline)
Vue.use(TimelineItem)

Vue.component('tree-table', TreeTable)
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 请求拦截器，请求头添加Authorization字段
axios.interceptors.request.use(config => {
  Nprogress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须return config
  return config
})

// 响应拦截器
axios.interceptors.response.use(config => {
  Nprogress.done()

  return config
})

Vue.prototype.$http = axios

Vue.use(ElementUI)

// Vue.config.productionTip = false 来关闭生产模式下给出的提示
Vue.config.productionTip = false

// 时间过滤器，将时间戳转换为日期格式
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
