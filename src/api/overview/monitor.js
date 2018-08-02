import request from '@/utils/request'

export function getData(params) {
  return request({
    url: 'api/dashboard',
    method: 'get',
    params
  })
}
