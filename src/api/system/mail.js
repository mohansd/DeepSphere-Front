import request from '@/utils/request'

export function getmailSender() {
  return request({
    url: '/api/manage/mailSender',
    method: 'get'
  })
}

export function setmailSender(params) {
  return request({
    url: '/api/manage/mailSender',
    method: 'put',
    data: params
  })
}

export function getmailReceiver() {
  return request({
    url: '/api/manage/mailReceiver',
    method: 'get'
  })
}

export function addmailReceiver(params) {
  return request({
    url: '/api/manage/mailReceiver',
    method: 'put',
    data: params
  })
}

export function deletemailReceiver(account) {
  return request({
    url: '/api/manage/mailReceiver/' + account,
    method: 'delete'
  })
}
