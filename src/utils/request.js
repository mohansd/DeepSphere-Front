import axios from 'axios'
// create an axios instance
import { Message } from 'element-ui'
// import store from '../store'
// import router from './../router'
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
    return response
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
