import request from '@/utils/request'

export function getIscsi() {
  return request({
    url: 'api/cephRbd',
    method: 'get'
  })
}

export function addIscsi(ip) {
  return request({
    url: 'api/cephRbd',
    method: 'post',
    data: {
      ip: ip
    }
  })
}

export function deleteIscsi(ip) {
  return request({
    url: 'api/cephRbd/' + ip,
    method: 'delete'
  })
}

export function setIscsi(method, ip) {
  return request({
    url: 'api/cephRbd',
    method: 'put',
    data: {
      method: method,
      ip: ip
    }
  })
}

// 添加/删除iscsi目标
export function setIscsiTarget(method, pool, image) {
  return request({
    url: 'api/cephRbd/image',
    method: 'put',
    data: {
      method: method,
      pool: pool,
      image: image
    }
  })
}
