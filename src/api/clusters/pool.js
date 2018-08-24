import request from '@/utils/request'

export function getList() {
  return request({
    url: 'api/healthData',
    method: 'get'
  })
}

export function createPool(params) {
  return request({
    url: 'api/ceph/pool',
    method: 'post',
    data: params
  })
}

export function changePool(poolName, params) {
  return request({
    url: 'api/ceph/pool/' + poolName,
    method: 'post',
    data: params
  })
}

export function deletePool(params) {
  return request({
    url: 'api/ceph/pool',
    method: 'delete',
    data: {
      name: params
    }
  })
}

export function getPool(params) {
  return request({
    url: 'api/ceph/pool/' + params,
    method: 'get'
  })
}

export function geterasure() {
  return request({
    url: 'api/ceph/erasureprofiles',
    method: 'get'
  })
}

export function getcrush() {
  return request({
    url: 'api/ceph/crushrules',
    method: 'get'
  })
}

export function createtier(params) {
  return request({
    url: 'api/ceph/tier',
    method: 'put',
    data: params
  })
}

export function deleteTier(params) {
  return request({
    url: 'api/ceph/tier',
    method: 'delete',
    data: params
  })
}
