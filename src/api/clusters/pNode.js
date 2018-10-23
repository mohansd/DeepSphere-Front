import request from '@/utils/request'

export function getNodeList() {
  return request({
    url: 'api/ceph/pNode',
    method: 'get'
  })
}

export function addNode(params) {
  return request({
    url: 'api/ceph/pNode',
    method: 'post',
    data: params
  })
}

export function deleteNode(ip) {
  return request({
    url: 'api/ceph/pnode/' + ip,
    method: 'delete'
  })
}
