import request from '@/utils/request'

export function getSMB() {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'SMB',
      method: 'getSettings',
      params: null,
      options: null
    }
  })
}

export function setSMB(params) {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'SMB',
      method: 'setSettings',
      params: params,
      options: null
    }
  })
}

export function getNFS() {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'NFS',
      method: 'getSettings',
      params: null,
      options: null

    }
  })
}

export function setNFS(params) {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'NFS',
      method: 'setSettings',
      params: params,
      options: null

    }
  })
}

export function login() {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'Session',
      method: 'login',
      params: {
        username: 'admin',
        password: 'admin' },
      options: null

    }
  })
}
