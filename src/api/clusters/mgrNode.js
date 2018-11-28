import request from '@/utils/request'

export function getList() {
  return request({
    url: '/api/ceph/mgrNode',
    method: 'get'
  })
}

export function addmgrNode(params) {
  return request({
    url: '/api/ceph/mgrNode',
    method: 'post',
    data: params
  })
}

export function getModules(ip) {
  return request({
    url: '/api/ceph/mgrNode/modules/' + ip,
    method: 'get'
  })
}

export function updateModules(ip, module, action) {
  return request({
    url: '/api/ceph/mgrNode/modules/' + ip,
    method: 'put',
    data: {
      moduleName: module,
      action: action
    }
  })
}

export function changeState(ip, state) {
  return request({
    url: '/api/ceph/mgrNode/' + ip,
    method: 'put',
    data: {
      state: state
    }
  })
}

export function deletemgrNode(ip) {
  return request({
    url: '/api/ceph/mgrNode/' + ip,
    method: 'delete',
    data: {
      ip: ip
    }
  })
}
