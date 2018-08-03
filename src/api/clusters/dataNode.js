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

export function createOSD(params) {
  return request({
    url: '/api/ceph/dataNode/' + params.hostname,
    method: 'put',
    data: {
      disk: params.disk
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

