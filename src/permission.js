import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权
// import { permissiontest } from './api/login'
import axios from 'axios'
// const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.auth) {
    // 对路由进行验证
    let auth = 0
    store.dispatch('GetInfo').then(res => {
      auth = res.data.code
      if (auth === 0) {
        NProgress.done()
        next()
      } else {
        // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
        next({ path: '/login' })
      }
    })
  } else {
    NProgress.done()
    console.log('name: ' + store.state.user.name)
    if (store.state.user.name === '') {
      axios({
        method: 'get',
        url: 'http://192.168.3.96:3001/',
        withCredentials: true
      }).then(res => {
        console.log(res)
        if (res.data.code === 3) {
          console.log(3)
          store.dispatch('SetGuest')
        } else {
          console.log(0)
          store.dispatch('GetInfo')
        }
      })
    }
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
