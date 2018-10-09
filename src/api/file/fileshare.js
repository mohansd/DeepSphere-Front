import request from '@/utils/request'

export function getShareList() {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbGetShareList',
      params: null
    }
  })
}

export function createShare(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbCreateShare',
      params: params
    }
  })
}

export function deleteShare(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbDeleteShare',
      params: params
    }
  })
}

