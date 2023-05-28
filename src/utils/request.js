import router from '@/router'
import store from '@/store'
import axios from 'axios'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({
  baseURL
})

// myAxios.interceptors.request.use(
//   function (config) {
//     config.headers.Authorization = store.state.token
//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

// 这是一个后台管理类项目, 除了登录和注册接口后端不要求使用token, 其他接口都得携带token
// 白名单
const whiteAPIList = ['/api/reg', '/api/login']

// 定义请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    if (!whiteAPIList.includes(config.url)) {
      config.headers.Authorization = store.state.token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// myAxios.interceptors.response.use(
//   function (response) {
//     return response
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

myAxios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      // 无效的token
      // 把vuex中的token重置为空，并跳转到登陆页面
      store.commit('updateToken', '')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default myAxios
