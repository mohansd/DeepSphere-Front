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
    url: `/api/cephRbd/${pool}/${image}`,
    method: 'delete'
  })
}

