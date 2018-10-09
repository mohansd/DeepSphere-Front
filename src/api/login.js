import request from '@/utils/request'

export function login(loginform) {
  return request({
    url: '/login',
    method: 'post',
    data: loginform
  })
}

export function getInfo(token) {
  return request({
    url: '/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function changePassword(params) {
  return request({
    url: '/changePassword',
    method: 'post',
    data: params
  })
}
