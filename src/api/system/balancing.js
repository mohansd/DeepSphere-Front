import request from '@/utils/request'

export function getState() {
  return request({
    url: '/api/balancing/state',
    method: 'get'
  })
}

export function getServer() {
  return request({
    url: '/api/balancing/server',
    method: 'get'
  })
}

export function changeServer(ip) {
  return request({
    url: '/api/balancing/server/' + ip,
    method: 'put'
  })
}

export function getdomain() {
  return request({
    url: '/api/balancing/domain',
    method: 'get'
  })
}

export function changedomain(domain) {
  return request({
    url: '/api/balancing/domain/' + domain,
    method: 'put'
  })
}

export function getforwarder() {
  return request({
    url: '/api/balancing/forwarder',
    method: 'get'
  })
}

export function addforwarder(ip) {
  return request({
    url: '/api/balancing/forwarder/' + ip,
    method: 'put'
  })
}

export function deleteforwarder(ip) {
  return request({
    url: '/api/balancing/forwarder/' + ip,
    method: 'delete'
  })
}

export function getclients() {
  return request({
    url: '/api/balancing/clients',
    method: 'get'
  })
}

export function addclient(ip) {
  return request({
    url: '/api/balancing/client/' + ip,
    method: 'put'
  })
}

export function deleteclient(ip) {
  return request({
    url: '/api/balancing/client/' + ip,
    method: 'delete'
  })
}

export function serveraction(action) {
  return request({
    url: '/api/balancing/server/' + action,
    method: 'post'
  })
}

