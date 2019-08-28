import request from '@/utils/request'

// 获取rbd存储池与镜像列表
export function getRbd(loginform) {
  return request({
    url: '/api/cephRbd/pool',
    method: 'get'
  })
}

// 初始化rbd存储池
export function initRbd(pool) {
  return request({
    url: '/api/cephRbd/pool',
    method: 'post',
    data: {
      pool: pool
    }
  })
}

// 销毁rbd存储池
export function deleteRbd(pool) {
  return request({
    url: '/api/cephRbd/pool/' + pool,
    method: 'delete'
  })
}

// 创建镜像
export function addImage(params) {
  return request({
    url: '/api/cephRbd/image',
    method: 'post',
    data: params
  })
}

// 删除镜像
export function deleteImage(pool, image) {
  return request({
    url: `/api/cephRbd/image/${pool}/${image}`,
    method: 'delete'
  })
}

// 添加/删除iscsi目标
export function setImageTarget(params) {
  return request({
    url: `/api/cephRbd/image`,
    method: 'put',
    data: params
  })
}

// 获取镜像对应的快照列表
export function getsnap(params) {
  return request({
    url: `/api/cephRbd/snap/${params.pool}/${params.image}`,
    method: 'get'
  })
}

// 创建快照
export function createsnap(data) {
  return request({
    url: '/api/cephRbd/snap',
    method: 'post',
    data: data
  })
}

// 删除快照
export function deletesnap(params) {
  return request({
    url: `/api/cephRbd/snap/${params.pool}/${params.image}/${params.snap}`,
    method: 'delete'
  })
}

// 快照恢复
export function rollbacksnap(params) {
  return request({
    url: `/api/cephRbd/snap/${params.pool}/${params.image}/${params.snap}`,
    method: 'put'
  })
}
