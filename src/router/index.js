import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home', // 默认显示首页的二级路由
    children: [
      { path: 'home', component: () => import('@/views/home') },
      { path: 'user-info', component: () => import('@/views/user/userInfo') },
      { path: 'user-avatar', component: () => import('@/views/user/userAvatar') },
      { path: 'user-pwd', component: () => import('@/views/user/userPwd') },
      { path: 'art-cate', component: () => import('@/views/ article/artCate') },
      { path: 'art-list', component: () => import('@/views/ article/artList') }
    ]
  },
  { path: '/reg', component: () => import('@/views/register') },
  { path: '/login', component: () => import('@/views/login') }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/reg']
router.beforeEach((to, from, next) => {
  const token = store.state.token
  // if (token && !store.state.userInfo.username) {
  //   // 有token但是没有用户信息，才去请求用户信息保存到vuex里
  //   // 调用actions里方法请求数据
  //   store.dispatch('initUserInfo')
  // }

  if (token) {
    // 如果有token，证明已登陆
    if (!store.state.userInfo.username) {
      // 有token但是没有用户信息，才去请求用户信息保存到vuex里
      // 调用actions里面的方法请求数据
      store.dispatch('initUserInfo')
      // 下次切换页面vuex里有用户信息数据就不会请求用户信息
    }
    // 路由放行
    next()
  } else {
    // 如果无token
    // 如果去的是白名单页面，则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果是其他页面强制拦截并跳转到登陆页面
      next('/login')
    }
  }
})

export default router
