import request from '@/utils/request'

export function getList() {
  return request({
    url: '/api/ceph/dataNode',
    method: 'get'
  })
}

export function getDisk(ip) {
  return request({
    url: '/api/ceph/disks/' + ip,
    method: 'get'
  })
}

