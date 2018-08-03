import request from '@/utils/request'

export function getfs() {
  return request({
    url: '/api/ceph/fs',
    method: 'get'
  })
}

export function createfs(params) {
  return request({
    url: '/api/ceph/fs',
    method: 'put',
    data: params
  })
}

export function mountfs(ip, name) {
  return request({
    url: '/api/ceph/fs/' + ip,
    method: 'post',
    data: {
      fsName: name
    }
  })
}

export function deletefs(params) {
  return request({
    url: '/api/ceph/fs/' + params.name,
    method: 'delete'
  })
}
