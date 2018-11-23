import axios from 'axios'

const service = axios.create({
  baseURL: process.env.LICENCE_API // api的base_url
})

export function register(key) {
  return service({
    url: '/api/v1/register/' + key,
    method: 'get'
  })
}

export function getStatus(key) {
  return service({
    url: '/api/v1/status',
    method: 'get'
  })
}
