import request from '@/utils/request'

export function getMonNode() {
  return request({
    url: 'api/ceph/monNode',
    method: 'get'
  })
}

export function addMonNode(ip) {
  return request({
    url: 'api/ceph/monNode',
    method: 'post',
    data: {
      ip: ip
    }
  })
}

export function deleteMonNode(ip) {
  return request({
    url: 'api/ceph/monNode/' + ip,
    method: 'delete'
  })
}

export function setMonNode(method, ip) {
  return request({
    url: 'api/ceph/monNode',
    method: 'put',
    data: {
      method: method,
      ip: ip
    }
  })
}
