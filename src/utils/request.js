import axios from 'axios'
// create an axios instance
import { Message, MessageBox } from 'element-ui'
// import store from '../store'
import router from './../router'
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  withCredentials: true
})
// respone interceptor
// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers['Accept'] = 'application/json'
  config.headers['Content-Type'] = 'application/json; charset=utf-8'
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 3) {
      if (res.message === 'No Authentication') {
        MessageBox.alert('你已被登出，请重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          type: 'info'
        }).then(() => {
          // location.reload()// 为了重新实例化vue-router对象 避免bug
          router.push('/login')
        })
        return Promise.reject('error')
      } else {
        Message({
          message: '用户名或密码错误',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject('error')
      }
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
