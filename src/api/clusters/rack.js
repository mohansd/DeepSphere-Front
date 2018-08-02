import request from '@/utils/request'

export function getList() {
  return request({
    url: '/api/rack/',
    method: 'get'
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
