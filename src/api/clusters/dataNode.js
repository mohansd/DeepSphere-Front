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

export function createOSD(ip) {
  return request({
    url: '/api/ceph/dataNode',
    method: 'post',
    data: {
      ip: ip
    }
  })
}

export function deleteOSD(params) {
  return request({
    url: '/api/ceph/dataNode/' + params.name,
    method: 'delete',
    data: {
      ip: params.ip
    }
  })
}

