import request from '@/utils/request'

export function getData() {
  return request({
    url: 'api/healthData',
    method: 'get'
  })
}

