import { asyncRouterMap, constantRouterMap } from '@/router'
import { getStatus } from '../../api/licence/licence'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res.splice(res.length - 1, 1)
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    licence: ''
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_LICENCE: (state, licence) => {
      state.licence = licence
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('user')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    CheckLicence({ commit }) {
      return new Promise((resolve, reject) => {
        getStatus().then(res => {
          if (res.data && res.data !== 'No Valid key registered') {
            commit('SET_LICENCE', res.data)
            resolve(res)
          } else {
            commit('SET_LICENCE', '')
            reject('err')
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default permission
