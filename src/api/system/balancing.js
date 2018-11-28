import request from '@/utils/request'

export function getDNSHost() {
  return request({
    url: '/api/balancing/DNSHost',
    method: 'get'
  })
}

export function addDNSHost(ip) {
  return request({
    url: '/api/balancing/DNSHost/' + ip,
    method: 'post'
  })
}

export function deleteDNSHost(ip) {
  return request({
    url: '/api/balancing/DNSHost/' + ip,
    method: 'delete'
  })
}

export function restartDNSHost(ip, method) {
  return request({
    url: '/api/balancing/DNSHost',
    method: 'put',
    data: {
      method: method,
      ip: ip
    }
  })
}

export function getDNSRcord() {
  return request({
    url: '/api/balancing/DNSRcord',
    method: 'get'
  })
}

export function addDNSRcord(params) {
  return request({
    url: '/api/balancing/DNSRcord',
    method: 'post',
    data: params
  })
}

export function deleteDNSRcord(params) {
  return request({
    url: '/api/balancing/DNSRcord',
    method: 'delete',
    data: params
  })
}

export function putDNSRcord(params) {
  return request({
    url: '/api/balancing/DNSRcord',
    method: 'put',
    data: params
  })
}

export function freshDNS(params) {
  return request({
    url: '/api/balancing/DNSFresh',
    method: 'options'
  })
}
