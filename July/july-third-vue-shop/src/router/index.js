import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login.vue'
const Login = () => import( /* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
// import Home from '../components/Home.vue'
const Home = () => import( /* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
// import Welcome from '../components/Welcome.vue'
const Welcome = () => import( /* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')

// import Users from '../components/users/User.vue'
const Users = () => import( /* webpackChunkName: "uses_rights_roles" */ '../components/users/User.vue')
// import Rights from '../components/power/Rights.vue'
const Rights = () => import( /* webpackChunkName: "uses_rights_roles" */ '../components/power/Rights.vue')
// import Roles from '../components/power/Roles.vue'
const Roles = () => import( /* webpackChunkName: "uses_rights_roles" */ '../components/power/Roles.vue')

// import Cate from '../components/goods/Cate.vue'
const Cate = () => import( /* webpackChunkName: "cate_params" */ '../components/goods/Cate.vue')
// import Params from '../components/goods/Params.vue'
const Params = () => import( /* webpackChunkName: "cate_params" */ '../components/goods/Params.vue')

// import GoodsList from '../components/goods/List.vue'
const GoodsList = () => import( /* webpackChunkName: "goodslist_addgoods" */ '../components/goods/List.vue')
// import AddGoods from '../components/goods/Add.vue'
const AddGoods = () => import( /* webpackChunkName: "goodslist_addgoods" */ '../components/goods/Add.vue')

// import Order from '../components/orders/Order.vue'
const Order = () => import( /* webpackChunkName: "order_report" */ '../components/orders/Order.vue')
// import Report from '../components/report/Report.vue'
const Report = () => import( /* webpackChunkName: "order_report" */ '../components/report/Report.vue')

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  component: Login
}, {
  path: '/home',
  component: Home,
  redirect: '/welcome',
  children: [{
    path: '/welcome',
    component: Welcome
  }, {
    path: '/users',
    component: Users
  }, {
    path: '/rights',
    component: Rights
  }, {
    path: '/roles',
    component: Roles
  }, {
    path: '/categories',
    component: Cate
  }, {
    path: '/params',
    component: Params
  }, {
    path: '/goods',
    component: GoodsList
  }, {
    path: '/goods/add',
    component: AddGoods
  }, {
    path: '/orders',
    component: Order
  }, {
    path: '/reports',
    component: Report
  }]
}]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 表示将要访问的路径
  // from 表示从哪个路径跳转而来
  // next 是一个函数 表示 放行 两种写法 1.next() 2.next('/login')强制跳转
  if (to.path === '/login') return next()
  // 获取token 值
  const tokenVulue = window.sessionStorage.getItem('token')
  if (!tokenVulue) return next('/login')
  next()
})

export default router
