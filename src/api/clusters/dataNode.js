import request from '@/utils/request'

export function getList() {
  return request({
    url: '/api/ceph/dataNode',
    method: 'get'
  })
}

export function getDisk(ip) {
  return request({
    url: '/api/ceph/disks/' + ip,
    method: 'get'
  })
}

export function createOSD(newNode) {
  return request({
    url: '/api/ceph/dataNode/' + newNode.hostname,
    method: 'put',
    data: {
      disk: newNode.disk
    }
  })
}

export function deleteOSD(params) {
  return request({
    url: '/api/ceph/dataNode/' + params.name,
    method: 'delete',
    data: {
      ip: params.ip
    }
  })
}

// get osd tree
export function getosdTree() {
  return request({
    url: '/api/ceph/dataNode/osdTree',
    method: 'get'
  })
}

export function setosdClass(osd_id, device) {
  return request({
    url: '/api/ceph/dataNode/' + osd_id,
    method: 'post',
    data: {
      class: device
    }
  })
}
