import request from '@/utils/request'

export function getUserList() {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbGetUserList',
      params: {}
    }
  })
}

export function addUser(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbAddUser',
      params: params
    }
  })
}

export function deleteUser(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbDeleteUser',
      params: params
    }
  })
}

export function setUser(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbSetUser',
      params: params
    }
  })
}

export function getGroupList() {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbGetGroupList',
      params: null
    }
  })
}

export function getGroupInfo(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbGetGroup',
      params: {
        groupName: params
      }
    }
  })
}

export function setGroup(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbSetGroup',
      params: params
    }
  })
}

export function addGroup(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbAddGroup',
      params: params
    }
  })
}

export function deleteGroup(params) {
  return request({
    url: '/api/smb',
    method: 'post',
    data: {
      method: 'smbDeleteGroup',
      params: params
    }
  })
}
