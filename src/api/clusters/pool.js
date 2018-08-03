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

export function changePool(params) {
  return request({
    url: 'api/ceph/pool/' + params.poolName,
    method: 'post',
    data: {
      size: params.size,
      pg_num: params.pg_num,
      pgp_num: params.pgp_num,
      max_objects: params.max_objects
    }
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
