import { login, logout, getInfo } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          let data = response.data
          commit('SET_NAME', data.data.username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const name = response.data.data.user.username
          if (name) {
            commit('SET_NAME', name)
            resolve(response)
          } else {
            reject('无正确用户信息')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    SetGuest({ commit }) {
      return new Promise(resolve => {
        let guest = 'Guest'
        commit('SET_NAME', guest)
        resolve()
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
