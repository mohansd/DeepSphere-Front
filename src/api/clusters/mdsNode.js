import request from '@/utils/request'

export function getMdsNode() {
  return request({
    url: 'api/ceph/mdsNode',
    method: 'get'
  })
}

export function addMdsNode(ip) {
  return request({
    url: 'api/ceph/mdsNode',
    method: 'post',
    data: {
      ip: ip
    }
  })
}

export function deleteMdsNode(ip) {
  return request({
    url: 'api/ceph/mdsNode/' + ip,
    method: 'delete'
  })
}

export function setMdsNode(method, ip) {
  return request({
    url: 'api/ceph/mdsNode',
    method: 'put',
    data: {
      method: method,
      ip: ip
    }
  })
}
