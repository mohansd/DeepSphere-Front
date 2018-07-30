import request from '@/utils/request'

export function getList() {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'ShareMgmt',
      method: 'getList',
      params: {
        start: 0,
        limit: 25,
        sortfield: 'name',
        sortdir: 'ASC' },
      options: null

    }
  })
}

export function getShareMgmt(params) {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'ShareMgmt',
      method: 'get',
      params: {
        uuid: 'b068205f-2516-4f07-a995-6542a5bb0963'
      },
      options: null

    }
  })
}

export function setShareMgmt(params) {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'ShareMgmt',
      method: 'set',
      params: params,
      options: null
    }
  })
}

export function getCandidates() {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'ShareMgmt',
      method: 'getCandidates',
      params: {},
      options: null
    }
  })
}
