import request from '@/utils/request'

export function getList() {
  return request({
    url: '/api/rack/osdtree2',
    method: 'get'
  })
}

export function movebucket(params) {
  return request({
    url: '/api/rack/bucket',
    method: 'put',
    data: params
  })
}

export function deletebucket(bucketName) {
  return request({
    url: '/api/rack/bucket/' + bucketName,
    method: 'delete'
  })
}

export function addRack(params) {
  return request({
    url: '/api/rack/',
    method: 'post',
    data: params
  })
}

export function getRack(params) {
  return request({
    url: '/api/rack/',
    method: 'get',
    params
  })
}

export function addpNode(rack, pnode) {
  return request({
    url: '/api/rack/' + rack,
    method: 'put',
    data: pnode
  })
}

export function deletepNode(rack, pnode) {
  return request({
    url: '/api/rack/' + rack,
    method: 'delete',
    data: pnode
  })
}

export function deleteRack(name) {
  return request({
    url: '/api/rack/',
    method: 'delete',
    data: {
      name: name
    }
  })
}
