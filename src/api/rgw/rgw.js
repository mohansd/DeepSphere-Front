import request from '@/utils/request'

export function getRgwList() {
  return request({
    url: '/api/cephRgw',
    method: 'get'
  })
}

export function addRgw(ip) {
  return request({
    url: '/api/cephRgw',
    method: 'post',
    data: {
      ip: ip
    }
  })
}

export function deleteRgw(ip) {
  return request({
    url: '/api/cephRgw/' + ip,
    method: 'delete'
  })
}
