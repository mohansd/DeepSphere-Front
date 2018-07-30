import request from '@/utils/request'

export function getList() {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'UserMgmt',
      method: 'getUserList',
      params: {
        start: 0,
        limit: 25,
        sortfield: 'name',
        sortdir: 'ASC' },
      options: null
    }
  })
}

export function getGroupList() {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'UserMgmt',
      method: 'getGroupList',
      params: {
        start: 0,
        limit: 25,
        sortfield: 'name',
        sortdir: 'ASC' },
      options: null
    }
  })
}
// 获取选中用户组信息
export function getGroup(params) {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'UserMgmt',
      method: 'getGroup',
      params: {
        name: params },
      options: null
    }
  })
}

// 获取用户列表
export function getAllUsers(params) {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'UserMgmt',
      method: 'enumerateAllUsers',
      params: {},
      options: null
    }
  })
}

export function setUser(params) {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'UserMgmt',
      method: 'setUser',
      params: params,
      options: null
    }
  })
}

export function getShells() {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'System',
      method: 'getShells',
      params: {},
      options: null
    }
  })
}

export function getAllGroup() {
  return request({
    url: '/api/nas/transport/admin',
    method: 'post',
    data: {
      service: 'UserMgmt',
      method: 'enumerateAllGroups',
      params: {},
      options: null

    }
  })
}
