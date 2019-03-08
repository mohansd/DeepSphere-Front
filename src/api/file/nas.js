import request from '@/utils/request'

export function sambaSetting(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: params
  })
}

export function setSMB(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbSetGlobal',
      params: params
    }
  })
}

export function restartSMB() {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbRestart',
      params: null
    }
  })
}

export function getStat() {
  return request({
    url: '/api/nfs',
    method: 'post',
    data: {
      method: 'nfsStat',
      params: null
    }
  })
}

export function nfsFreshShare() {
  return request({
    url: '/api/nfs',
    method: 'post',
    data: {
      method: 'nfsFreshShare',
      params: null
    }
  })
}

export function nfsRestart() {
  return request({
    url: '/api/nfs',
    method: 'post',
    data: {
      method: 'nfsRestart',
      params: null
    }
  })
}

export function nfsStop() {
  return request({
    url: '/api/nfs',
    method: 'post',
    data: {
      method: 'nfsStop',
      params: null
    }
  })
}

export function getNasNodes() {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbGetHost',
      params: null
    }
  })
}

export function addNasNode(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbAddHost',
      params: params
    }
  })
}

export function removeNasNode(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbRemoveHost',
      params: params
    }
  })
}

export function setServives(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbSetServices',
      params: params
    }
  })
}
