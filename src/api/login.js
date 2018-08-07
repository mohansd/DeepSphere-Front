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
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
