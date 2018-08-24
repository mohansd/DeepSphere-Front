import request from '@/utils/request'

export function getntpserver() {
  return request({
    url: '/api/manage/ntpServer',
    method: 'get'
  })
}

export function setntpserver(params) {
  return request({
    url: '/api/manage/ntpServer',
    method: 'put',
    data: params
  })
}

