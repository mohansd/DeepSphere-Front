import request from '@/utils/request'

export function getfs() {
  return request({
    url: '/api/ceph/fs',
    method: 'get'
  })
}

