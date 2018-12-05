import request from '@/utils/request'

export function getRgwUserList() {
  return request({
    url: '/api/cephRgw/user',
    method: 'get'
  })
}

export function addRgwUser(user) {
  return request({
    url: '/api/cephRgw/user',
    method: 'post',
    data: user
  })
}

export function deleteRgwUser(username) {
  return request({
    url: '/api/cephRgw/user/' + username,
    method: 'delete'
  })
}

export function addRgwSubUser(subuser) {
  return request({
    url: '/api/cephRgw/subUser',
    method: 'post',
    data: subuser
  })
}

export function deleteSubRgwUser(username) {
  return request({
    url: '/api/cephRgw/subUser/' + username,
    method: 'delete'
  })
}
