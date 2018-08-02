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
