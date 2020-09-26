import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import user from '../components/user/user.vue'
import roles from '../components/power/roles.vue'
import rights from '../components/power/rights.vue'
import categories from '../components/goods/cate.vue'
import params from '../components/goods/params.vue'
import goodsList from '../components/goods/goodsList.vue'
import add from '../components/goods/add.vue'
import order from '../components/order/order.vue'
import report from '../components/report/report.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' }, // 重定向
  { path: '/login', component: login },
  {
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: welcome
    },
    {
      path: '/users',
      component: user
    },
    {
      path: '/roles',
      component: roles
    },
    {
      path: '/rights',
      component: rights
    },
    {
      path: '/categories',
      component: categories
    },
    {
      path: '/params',
      component: params
    },
    {
      path: '/goods',
      component: goodsList
    },
    {
      path: '/goods/add',
      component: add
    },
    {
      path: '/orders',
      component: order
    },
    {
      path: '/reports',
      component: report
    }
  ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
