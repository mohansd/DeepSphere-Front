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

